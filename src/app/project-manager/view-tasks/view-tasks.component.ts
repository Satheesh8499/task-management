import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../rest-api.service'; // Import your RestApiService

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks: any[] = [];
  showModal = false;
  taskForm: FormGroup;
  selectedTask: any;

  constructor(
    private restApi: RestApiService, // Inject RestApiService
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      assignedTo: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: [''],
      dueDate: ['', Validators.required],
      completedDate: [''],
      projectId: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.restApi.getTasks().subscribe({
      next: (data: any[]) => {
        this.tasks = data;
      },
      error: (err: any) => {
        console.error('Error loading tasks', err);
      }
    });
  }
  

  openTaskForm(task: any): void {
    this.selectedTask = task;
    this.taskForm.patchValue(task);
    this.showModal = true;
  }

  closeTaskForm(): void {
    this.showModal = false;
    this.taskForm.reset();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.selectedTask, ...this.taskForm.value };
      this.restApi.updateTask(updatedTask.id, updatedTask).subscribe({
        next: () => {
          this.loadTasks();
          this.closeTaskForm(); // Close the form after successful submission
          alert('Task updated successfully!');
        },
        error: (err: any) => {
          console.error('Error updating task', err);
        }
      });
    }
  }

  onUpdate(task: any): void {
    this.openTaskForm(task);
  }

  onDelete(taskId: number): void {
    this.restApi.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        alert('Task deleted successfully!');
      },
      error: (err: any) => {
        console.error('Failed to delete task:', err);
      }
    });
  }
}
