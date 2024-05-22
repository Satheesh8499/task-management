import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Task } from '../../service/task';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapDialogComponent } from '../bootstrap-dialog/bootstrap-dialog.component';
import { ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskServiceService } from '../../service/task-service.service';
declare var bootstrap: any;


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild('taskModal') taskModal!: ElementRef;


  Task: any[] = [];
  filteredTasks: any[] = [];
  selectedPriority: string = 'All';
  selectedStatus: string = 'All';
  searchQuery: string = '';
  selectedTask: any = {};
  detailsModalRef: NgbModalRef | undefined;

  @ViewChild('detailsModal', { static: true }) detailsModal: TemplateRef<any> | undefined;

  constructor(public restApi: TaskServiceService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    this.restApi.getTasks().subscribe((data: any) => {
      this.Task = data;
      this.filterTasks();
    });
  }

  filterTasks() {
    this.filteredTasks = this.Task.filter(task => {
      const matchesPriority = this.selectedPriority === 'All' || task.priority === this.selectedPriority;
      const matchesStatus = this.selectedStatus === 'All' || task.status === this.selectedStatus;
      const matchesSearchQuery = this.searchQuery === '' || task.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesPriority && matchesStatus && matchesSearchQuery;
    });
  }

  openUpdateStatusModal(task: any): void {
    this.selectedTask = { ...task };
  }

  openDetailsModal(task: Task): void {
    this.detailsModalRef = this.modalService.open(this.detailsModal, { centered: true }); // Open the details modal
    this.detailsModalRef.componentInstance.task = task; // Pass the task details to the modal
  }

  

  updateTaskStatus(): void {
    this.restApi.updateTask(this.selectedTask.id, this.selectedTask).subscribe(() => {
      this.loadTask();
      
    });
  }

  openBootstrapModal(task: any): void {
    const modalRef = this.modalService.open(BootstrapDialogComponent);
    modalRef.componentInstance.task = task;
  }

  onSearchChange() {
    this.filterTasks();
  }

  submitTask(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const task: Task = {
      name: form.value.taskName,
      description: form.value.description,
      priority: form.value.priority,
      status: form.value.status,
      startDate: form.value.startdate,
      dueDate: form.value.duedate,
      //projectName: form.value.projectName,
      assignedTo: form.value.assignedto,
      id: 0,
      completedDate: null,
      labels: []
    };

    this.restApi.createTask(task).subscribe(
      (response: any) => {
        console.log('Task created successfully:', response);
        this.loadTask();
        form.resetForm();
        // Close the modal manually if needed
        const modalElement = this.taskModal.nativeElement;
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      },
      (error: any) => {
        console.error('Error creating task:', error);
      }
    );
  }



}
