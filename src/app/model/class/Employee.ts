export class Employee {
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;
    createdDate?: string;
    constructor(){
        this.contactNo = '';
        this.employeeId = 0;
        // this.createdDate= '2025-04-06T11:38:13.751Z';
        this.deptId = 0;
        this.employeeName = '';
        this.gender = '';
        this.role = '';
        this.emailId = '';
        this.password = ''
    }
  }
  