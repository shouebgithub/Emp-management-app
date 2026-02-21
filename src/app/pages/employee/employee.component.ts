import { Component, EventEmitter, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAPIResonse, IChildDept, IParentDept } from '../../model/interface/master';
import {FormsModule} from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Employee } from '../../model/class/Employee';
import { MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule, MatPaginatorModule, NgFor, NgIf, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  items = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(){}

  

isFormVisible = signal<boolean>(false);
parentDeptList= signal<IParentDept[]>([]);
parentDeptId: number = 0;
childDeptList = signal<IChildDept[]>([]);
empList = signal<Employee[]>([]);
// empList: any[] = [];
empObj: Employee = new Employee();
masterService = inject(MasterService)
dataSource = new MatTableDataSource<Employee>();
ngOnInit(): void {
this.getPDept();
this.getAllEmployees();
// this.getItems();
}

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
}

displayedColumns: string[] = ['employeeId', 'employeeName', 'contactNo', 'emailId', 'deptId', 'gender', 'role','actions'];

 
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
  // this.masterService.getAllEmps().subscribe((res:Employee[]) =>{
  //   this.totalItems = res.length;
  //   console.log(this.totalItems);
   
  //   if(res){
  //     this.empList.set(res);      
  //   } else {
  //     alert("api issue");
  //   }

  // })
  this.masterService.getAllEmps().subscribe((res:Employee[])=>{
    console.log("result from api",res)
    this.dataSource.data = res;
  })
  }  
  
  onClose(){
    this.isFormVisible.set(false);
    this.empObj = new Employee(); 
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

// pagination

  

// getItems(): any {
//   this.masterService.getItems(this.pageIndex + 1, this.pageSize)
//     .subscribe((response) => {
//       this.items = response.data;
//       console.log("what is this", this. items);
//       this.totalItems = response.total;
//     });
// }
// onPageChange(event: PageEvent): void {
//   this.pageIndex = event.pageIndex;
//   this.pageSize = event.pageSize;
//   this.getItems();
// }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}


}
