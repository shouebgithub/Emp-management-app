import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAllEmp, IAPIResonse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {


  isFormVisible = signal<boolean>(false);

  parentDeptList = signal<IParentDept[]>([]);
  parentDeptId: number = 0;

  childDeptList = signal<IChildDept[]>([]);

  empList = signal<Employee[]>([]);
  // empList: any[] = [];
  empObj: Employee = new Employee();
  masterService = inject(MasterService)

  ngOnInit(): void {
    this.getPDept();
    this.getAllEmployees();
  }

  getPDept() {
    this.masterService.getParentDept().subscribe((res: IAPIResonse) => {
      this.parentDeptList.set(res.data);
    })
  }

  onParentDeptChange() {
    console.log(this.parentDeptId);
    this.masterService.getChildDeptByPDeptId(this.parentDeptId).subscribe((res: IAPIResonse) => {
      this.childDeptList.set(res.data);
    })
  }

  getAllEmployees() {
    this.masterService.getAllEmps().subscribe((res: any) => {
      console.log("all emps", res);
      if (res) {
        this.empList.set(res);
        // console.log(this.empList());
        // this.empList = res;
      } else {
        alert("issue with the code")
      }
    })
  }

  onEdit(empObj: Employee) {
    this.empObj = empObj;
    this.isFormVisible = signal<boolean>(true);

    this.masterService.editEmp(empObj.employeeId).subscribe((res: IAPIResonse) => {
      if (res) {
        console.log(res);
      } else {
        alert("check the code");
      }
    });
  }

  onUpdate() {
    alert("employee details updated")
    this.masterService.updateEmp(this.empObj).subscribe((res: IAPIResonse) => {
      if (res) {
        console.log(res);
        this.getAllEmployees();

      } else {
        alert("check the code");
      }
    });
  }

  onDelete(empObj:Employee){
    return this.masterService.deleteEmp(this.empObj.employeeId).subscribe((res: IAPIResonse)=>{
      if(res){
        alert(this.empObj.employeeId + "emp deleted successfully")     
        this.getAllEmployees();   
      }
      else {
        alert("issue with the code");
      }
    })
  }

  onSave(empObj: Employee) {
    alert("employee created")
    this.empObj = new Employee();

    this.masterService.createEmp(empObj).subscribe((res: IAPIResonse) => {
      if (res) {
        console.log(res.data);
        this.getAllEmployees();
      } else {
        alert("check the code");
      }
    });
  }

}
