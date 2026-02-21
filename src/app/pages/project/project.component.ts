import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IAPIResonse, Iproject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, RouterLink, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit, AfterViewInit {

  projectList: Iproject[] = [];
  masterServ = inject(MasterService);
  dataSource = new MatTableDataSource<Iproject>();
    @ViewChild(MatPaginator)
  paginator!: MatPaginator; 
  router = inject(Router);
  displayedColumns: string[] = ['projectId', 'projectName','clientName','startDate', 'leadByEmpId','contactPerson', 'contactNo', 'emailId', 'actions'];

constructor(){
}

  ngOnInit():void {
this.getProjectList();
  }

  ngAfterViewInit(){
      this.dataSource.paginator = this.paginator;
  }

  getProjectList(){
  this.masterServ.getAllProjects().subscribe((res:Iproject[])=>{
    if(res){
      this.dataSource.data = res;
      console.log(this.dataSource.data);
    } else {
      alert("API Issue");
    }
  })
  }

  editProject(id:number){
    this.router.navigate(['new-project', id])
  }

  deleteProject(id:number){
    this.masterServ.deleteByProjectId(id).subscribe((res)=>{
      if(res){
        alert("Project deleted Successfully");
        this.getProjectList();

      } else {
        alert("Issue with the API");
      }
    })
  }

}
