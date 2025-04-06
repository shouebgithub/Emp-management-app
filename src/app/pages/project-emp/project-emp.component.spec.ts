import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmpComponent } from './project-emp.component';

describe('ProjectEmpComponent', () => {
  let component: ProjectEmpComponent;
  let fixture: ComponentFixture<ProjectEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
