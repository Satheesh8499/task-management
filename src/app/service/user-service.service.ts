import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = 'http://localhost:3000/users'; // Example API URL

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    
    }),
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, JSON.stringify(user), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`,this.httpOptions).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(error); // Re-throw the error
      })
    );
  }

  deleteUserByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.delete(url);
  }


  updateUser(id:any,user:any):Observable<User>{
    return this.http.put<User>(this.apiUrl+'/employees/'+id,JSON.stringify(user),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
