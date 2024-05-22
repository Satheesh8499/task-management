import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ProjectServiceService } from '../../service/project-service.service';


@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.css']
})
export class ProjectChartComponent implements OnInit {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Duration (days)' }
    ]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Not Started', 'In Progress', 'Completed'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartData: ChartConfiguration['data'] = {
    labels: this.pieChartLabels,
    datasets: [
      { data: [], label: 'Task Status' }
    ]
  };

  constructor(private projectService: ProjectServiceService) {}

  ngOnInit(): void {
    this.loadProjectData();
  }

  loadProjectData(): void {
    this.projectService.getProjects().subscribe((projects:any) => {
      this.updateCharts(projects);
    });
  }

  updateCharts(projects: any[]): void {
    let taskDurations: number[] = [];
    let taskStatuses: { [key: string]: number } = { 'Not Started': 0, 'In Progress': 0, 'Completed': 0 };

    projects.forEach(project => {
      project.tasks.forEach((task:any) => {
        this.barChartLabels.push(task.taskName);
        const duration = this.calculateDuration(task.startDate, task.endDate);
        taskDurations.push(duration);

        // Assuming task status can be 'Not Started', 'In Progress', or 'Completed'
        if (task.status in taskStatuses) {
          taskStatuses[task.status]++;
        } else {
          taskStatuses[task.status] = 1; // Default case, if status is not in predefined list
        }
      });
    });

    this.barChartData.datasets[0].data = taskDurations;
    this.pieChartData.datasets[0].data = [taskStatuses['Not Started'], taskStatuses['In Progress'], taskStatuses['Completed']];
  }

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = (end.getTime() - start.getTime()) / (1000 * 3600 * 24); // Duration in days
    return Math.ceil(duration);
  }
}
