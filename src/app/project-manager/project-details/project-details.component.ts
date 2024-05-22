// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { RestApiService } from '../rest-api.service';

// @Component({
//   selector: 'app-project-details',
//   templateUrl: './project-details.component.html',
//   styleUrls: ['./project-details.component.css']
// })
// export class ProjectDetailsComponent implements OnInit {
//   projectForm: FormGroup;
//   projects: {
//     projectID: string;
//     projectName: string;
//     projectDescription: string;
//     endDate: string;
//     status: string;
//     members?: string[];
//     tasks?: string[];
//     showDetails?: boolean;
//   }[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private restApi: RestApiService
//   ) {
//     this.projectForm = this.fb.group({
//       projectID: ['', Validators.required],
//       projectName: ['', Validators.required],
//       projectDescription: ['', Validators.required],
//       endDate: ['', Validators.required],
//       status: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.loadProjects();
//   }

//   loadProjects(): void {
//     this.restApi.getProjects().subscribe({
//       next: (data: any[]) => {
//         this.projects = data.map(project => ({ ...project, showDetails: false }));
//       },
//       error: (err: any) => {
//         console.error('Error loading projects', err);
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.projectForm.valid) {
//       const newProject = { ...this.projectForm.value, members: [], tasks: [], showDetails: false };
//       this.projects.push(newProject);
//       this.projectForm.reset();
//     }
//   }

// //   toggleDetails(project: any): void {
// //     project.showDetails = !project.showDetails;
// //   }


//  toggleDetails(project: any): void {
//     // Toggle the showDetails property for all projects
//      console.log(project);
    
//     this.projects.forEach(p => {
//       if (this.projects) {
//         p.showDetails = !p.showDetails; // Toggle only for the clicked project
//       } else {
//         p.showDetails = false; // Close details for other projects
//       }
//     });
//   }
  

//   closeDetails(pr:any): void {
//     pr.showDetails = false;
//   }

//   addTaskMember(project: any): void {
//     const memberName = prompt('Enter the name of the task member:');
//     if (memberName) {
//       if (!project.members) {
//         project.members = [];
//       }
//       project.members.push(memberName);
//       console.log('Added task member', memberName, 'to project', project.projectName);
//     }
//   }

//   addTask(project: any): void {
//     const taskName = prompt('Enter the name of the task:');
//     if (taskName) {
//       if (!project.tasks) {
//         project.tasks = [];
//       }
//       project.tasks.push(taskName);
//       console.log('Added task', taskName, 'to project', project.projectName);
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projects: any[] = [];

  constructor(private restApi: RestApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.restApi.getProjects().subscribe({
      next: (data: any[]) => {
        this.projects = data.map(project => ({
          ...project,
          showDetails: false,
          
        }));
        // Fetch team members for each project
        this.projects.forEach(project => {
          this.restApi.getTeamMembers(project.projectID).subscribe({
            next: (teamMembers: any[]) => {
              project.teamMembers = teamMembers;
            },
            error: (err: any) => {
              console.error('Error loading team members', err);
            }
          });
        });
      },
      error: (err: any) => {
        console.error('Error loading projects', err);
      }
    });
  }

  toggleDetails(project: any): void {
    console.log(project);
    project.showDetails = !project.showDetails;
  }

  closeDetails(project: any): void {
    project.showDetails = false;
  }

  addTaskMember(project: any): void {
    const memberName = prompt('Enter the name of the task member:');
    if (memberName) {
      project.members.push(memberName);
    }
  }

  addTask(project: any): void {
    const taskName = prompt('Enter the name of the task:');
    if (taskName) {
      project.tasks.push({ TaskID: new Date().getTime(), TaskName: taskName });
    }
  }
}


