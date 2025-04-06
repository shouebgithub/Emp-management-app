import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResonse } from '../model/interface/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
api_url = "https://projectapi.gerasim.in/api/EmployeeManagement/"
  constructor(private http: HttpClient) { }

getParentDept(){
  return this.http.get<IAPIResonse>(this.api_url + "GetParentDepartment");
}

getChildDeptByPDeptId(parentDeptid:number){

  return this.http.get<IAPIResonse>(`${this.api_url}GetChildDepartmentByParentId?deptId=${parentDeptid}`);
}

getAllEmps(){
  return this.http.get<IAPIResonse>(`${this.api_url}GetAllEmployees`);
}



}
