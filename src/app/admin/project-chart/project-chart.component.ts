import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.css']
})
export class ProjectChartComponent {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Task 1', 'Task 2', 'Task 3'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [10, 20, 30], label: 'Duration (days)' }
    ]
  };

  constructor() { }
}
