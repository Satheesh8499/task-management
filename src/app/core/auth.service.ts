import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    console.log('admin login');
    if (username === 'admin' && password === 'admin') {
      this.currentUser = { username: 'admin', role: 'admin' };
      this.router.navigate(['/admin']);
      return true;
    } else if (username === 'manager' && password === 'manager') {
      this.currentUser = { username: 'manager', role: 'manager' };
      this.router.navigate(['/manager']);
      return true;
    } else if (username === 'team' && password === 'team') {
       console.log("team");
      this.currentUser = { username: 'team', role: 'team-member' };
      this.router.navigate(['/team-member']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getRole(): string {
    return this.currentUser ? this.currentUser.role : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}

