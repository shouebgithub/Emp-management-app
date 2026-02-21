export interface IAPIResonse {
    message: string,
    result: boolean,
    data: any
}

export interface IParentDept {
    departmentId: number
    departmentName: string
    departmentLogo: string
  }

  export interface IChildDept {
    childDeptId: number
    parentDeptId: number
    departmentName: string
  }
  

  export interface IprojectEmp {
  empProjectId: number
  projectId: number
  empId: number 
  assignedDate: string
  role: string
  isActive: boolean
}



export interface Iproject {
  projectId: number
  projectName: string
  clientName: string
  startDate: string
  leadByEmpId: number
  contactPerson: string
  contactNo: string
  emailId: string
}

  