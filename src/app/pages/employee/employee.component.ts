import { Component, EventEmitter, inject, OnInit, signal, viewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAPIResonse, IChildDept, IParentDept } from '../../model/interface/master';
import {FormsModule} from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Employee } from '../../model/class/Employee';
import { MatPaginatorModule} from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule, MatPaginatorModule, NgFor, NgIf],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  currentPage = 0;
  length: number = 100;
 
  constructor(){
 
  }



isFormVisible = signal<boolean>(false);

parentDeptList= signal<IParentDept[]>([]);
parentDeptId: number = 0;

childDeptList = signal<IChildDept[]>([]);

empList = signal<Employee[]>([]);
// empList: any[] = [];

empObj: Employee = new Employee();

// newEmpForm:FormGroup = new FormGroup({
//   employeeId:new FormControl(0),
//   employeeName:new FormControl(''),
//   contactNo:new FormControl(0),
//   emailId:new FormControl(''),
//   deptId:new FormControl(0),
//   password:new FormControl(''),
//   gender:new FormControl(''),
//   role:new FormControl(0),
//   createdDate:new FormControl('')  
// })

masterService = inject(MasterService)

ngOnInit(): void {
this.getPDept();
this.getAllEmployees();
}
 
getPDept(){
  this.masterService.getParentDept().subscribe((res:IAPIResonse)=>{
    this.parentDeptList.set(res.data);
  })
}

onParentDeptChange(){
  console.log(this.parentDeptId);
  this.masterService.getChildDeptByPDeptId(this.parentDeptId).subscribe((res:IAPIResonse)=>{
    this.childDeptList.set(res.data);
  })
}

getAllEmployees(){
  this.masterService.getAllEmps().subscribe((res:Employee[]) =>{
    if(res){
      this.empList.set(res);      
    } else {
      alert("api issue");
    }

  })
  }  
  
  onEdit(obj: Employee){
    this.empObj = obj;
    this.isFormVisible.set(true);
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }
  

  onUpdate(obj: Employee){
    this.masterService.updateEmp(this.empObj).subscribe((res:IAPIResonse)=>{
      alert("Employee Updated");
      this.getAllEmployees();
      this.empObj = new Employee();
      this.isFormVisible.set(false);
    }, (error)=>{
      alert("API Issue");
    })
  }

onSave(){
  debugger;
  // const formValue = this.empObj
  this.masterService.createEmp(this.empObj).subscribe((res:IAPIResonse)=>{
  debugger;
    alert("Employee created");
    this.getAllEmployees();
    this.empObj = new Employee();
  }, error => {
    alert("api issue");
  });
}

// delete operation

onDelete(empid:number){
  this.masterService.deleteEmpById(empid).subscribe((res:IAPIResonse) =>{
    const delEmp = confirm("Are you sure, you want to delete");
    if(res){
      alert("Employee deleted successfully");
      this.getAllEmployees();
    }
      else {
      alert("api error");
    }
  })
}


}
