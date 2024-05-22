import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private restApi: RestApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectID: ['', Validators.required],
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectManagerID: ['', Validators.required],
      startDate: [new Date().toISOString().split('T')[0]],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      tasks: this.fb.array([]),
      teamMembers: this.fb.array([])
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      // Here you can submit the form data to your backend or handle it as needed
    } else {
      console.log('Form is invalid');
    }
    this.restApi.createProject(this.projectForm.value).subscribe(() => {
      this.snackBar.open('Project Created Successfully', 'Close', {
        duration: 3000
      });
      //this.router.navigate(['/view-tasks']);
  }
)};




  get tasks() {
    return this.projectForm.get('tasks') as FormArray;
  }

  get teamMembers() {
    return this.projectForm.get('teamMembers') as FormArray;
  }

  addTask() {
    this.tasks.push(this.fb.group({
      name: ['', Validators.required],
      description: [''],
      assignedTo: [''],
      priority: ['Low'],
      status: ['Not Started'],
      dueDate: [''],
      startDate: [''],
      completedDate: ['']
    }));
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  addTeamMember() {
    this.teamMembers.push(this.fb.group({
      id: [''],
      name: ['', Validators.required],
      role: ['', Validators.required]
    }));
  }

  removeTeamMember(index: number) {
    this.teamMembers.removeAt(index);
  }
}
