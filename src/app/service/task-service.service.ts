import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Task } from './task';
import { User } from './user-service.service';

export interface project{
    projectID: number;
    projectName: string;
    projectDescription: string;
    projectManagerID: number;
    startDate: string;
    endDate: string;
    status: string;
    tasks: Task[];
    users?: User[];
  
}

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getTasks(): Observable<Task> {
    return this.http
      .get<Task>(this.apiURL + '/tasks')
      .pipe(retry(1), catchError(this.handleError));
  
  }
  createTask(task:any):Observable<Task>{
    return this.http.post<Task>(this.apiURL+'/tasks',JSON.stringify(task),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  updateTask(id:any,task:any):Observable<Task>{
    return this.http.put<Task>(this.apiURL+'/tasks/'+id,JSON.stringify(task),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  deleteTask(id:any){
    return this.http.delete<Task>(this.apiURL+'/tasks/'+id, this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
}
}

