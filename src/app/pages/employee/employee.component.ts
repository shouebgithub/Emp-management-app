import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAllEmp, IAPIResonse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {


isFormVisible = signal<boolean>(false);

parentDeptList= signal<IParentDept[]>([]);
parentDeptId: number = 0;

childDeptList = signal<IChildDept[]>([]);

empList = signal<IAllEmp[]>([]);
// empList: any[] = [];

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
this.masterService.getAllEmps().subscribe((res:any)=>{
  console.log("all emps",res); 
  if(res) {
    this.empList.set(res);
    // console.log(this.empList());
    // this.empList = res;
  } else {
    alert("issue with the code")
  }
})  
}


}
