import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Task } from './task';
interface Project {
  projectID: number;
  projectName: string;
  projectDescription: string;
  projectManagerID: number;
  startDate: string;
  endDate: string;
  status: string;
  tasks: Task[];
  teamMembers?: TeamMember[];
}
interface TeamMember {
  teamMemberID: number;
  teamMemberName: string;
  email: string;
  designation: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getProjects(): Observable<Project> {
    return this.http
      .get<Project>(this.apiURL + '/projects')
      .pipe(retry(1), catchError(this.handleError));
  
  }
  createProject(project:any):Observable<Project>{
    return this.http.post<Project>(this.apiURL+'/projects',JSON.stringify(project),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  updateProject(id:any,project:any):Observable<Project>{
    return this.http.put<Project>(this.apiURL+'/projects/'+id,JSON.stringify(project),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  deleteProject(id:any){
    return this.http.delete<Project>(this.apiURL+'/projects/'+id, this.httpOptions)
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
