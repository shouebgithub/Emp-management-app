import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectEmpComponent } from './pages/project-emp/project-emp.component';
import { authguardGuard } from './auth/authguard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authguardGuard]
            },
            {
                path: 'employee',
                component: EmployeeComponent
            },
            {
                path: 'project',
                component: ProjectComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'project_emp',
                component: ProjectEmpComponent
            },

        ]
    }
];
