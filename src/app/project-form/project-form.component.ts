import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { IAPIResonse, Iproject } from '../model/interface/master';
import { Employee } from '../model/class/Employee';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

projectForm: FormGroup= new FormGroup({});

constructor(){
  this.initializeForm();
  this.empList$ = this.masterServ.getAllEmps();
}

initializeForm() { 
  this.projectForm = new FormGroup({
  projectId: new FormControl(0),
  projectName: new FormControl('', [Validators.required]),
  clientName: new FormControl(''),
  startDate: new FormControl(''),
  leadByEmpId: new FormControl(''),
  contactPerson: new FormControl(''),
  contactNo: new FormControl(''),
  emailId: new FormControl('')
})
}

masterServ = inject(MasterService);

empList$: Observable<Employee[]> = new Observable<[]>

onsaveproject(){
  const formValue = this.projectForm.value;
  this.masterServ.saveProject(formValue).subscribe((res:Iproject)=>{
    if(res){
      alert("Project created successfully");
      this.projectForm.reset();
    } else {
      alert("API Issue");
    }
  })
}


}
