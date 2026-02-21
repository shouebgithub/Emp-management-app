import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResonse, Iproject } from '../model/interface/master';
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
  return this.http.get<Employee[]>(`${this.api_url}GetAllEmployees`);
}

createEmp(empObj:Employee):Observable<IAPIResonse>{
  return this.http.post<IAPIResonse>(this.api_url + "CreateEmployee", empObj);
}

updateEmp(obj:Employee):Observable<IAPIResonse>{
  return this.http.put<IAPIResonse>(this.api_url + "UpdateEmployee/" + obj.employeeId, obj);
  // https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee/11059
}

deleteEmpById(id:number){
  return this.http.delete<IAPIResonse>(`${this.api_url}DeleteEmployee/${id}`);
}

getItems(page: number, limit: number): Observable<any>{
return this.http.get(`${this.api_url}?page=${page}&limit=${limit}`);
}

saveProject(projectObj: Iproject):Observable<Iproject>{
  return this.http.post<Iproject>(this.api_url + "CreateProject", projectObj);
}

getAllProjects(){
return this.http.get<Iproject[]>(`${this.api_url}GetAllProjects`);
}

deleteByProjectId(id:number){
  return this.http.delete<IAPIResonse>(`${this.api_url}DeleteProject/${id}`);

}


}
