import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResonse } from '../model/interface/master';
import { Employee } from '../model/class/Employee';
import { Observable } from 'rxjs';

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

editEmp(id:number){
  console.log(id);
  return this.http.get<IAPIResonse>(`${this.api_url}GetEmployee/${id}`)
}

createEmp(empObj: Employee):Observable<IAPIResonse>{
  return this.http.post<IAPIResonse>(`${this.api_url}CreateEmployee`, empObj)
}

updateEmp(empObj:Employee){
  return this.http.put<IAPIResonse>(`${this.api_url}UpdateEmployee/`+ empObj.employeeId, empObj);
}
deleteEmp(id:number){
  return this.http.delete<IAPIResonse>(`${this.api_url}/` + id);
}
}
