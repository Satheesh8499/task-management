import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../service/project-service.service';




@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  showData: boolean = false;
  project: any;

  constructor(private projectService: ProjectServiceService) {}

  ngOnInit() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.projectService.getProjects().subscribe((data: any) => {
      // Assuming there's only one project in the data
      this.project = data[0];
    });
  }

  toggleData() {
    this.showData = !this.showData;
  }
}

