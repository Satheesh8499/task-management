import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiUrl = 'http://localhost:3000/tasks';
  private apiURL= 'http://localhost:3000/projects';// URL to your json-server

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTask(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  updateTask(taskId: number, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, taskData);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiURL, project);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL); // Change apiUrl to apiURL
  }
  

  getProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${projectId}`);
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${projectId}`, projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${projectId}`);
  }

  getTeamMembers(projectID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/${projectID}/teamMembers`);
  }
  
  
  private httpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }
}
