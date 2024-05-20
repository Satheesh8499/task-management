import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  username: string='';
  password: string=''; 
  errorMessage: string | undefined;


  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;


  ngAfterViewInit() {
    this.signUpButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add('right-panel-active');
    });

    this.signInButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove('right-panel-active');
    });
  }
  constructor(private authService: AuthService, private router: Router) {
    
  }


        
  login(): void {
         

    if (!this.authService.login(this.username,this.password)) {
      this.errorMessage = 'Invalid credentials';
    }


  }

 
}

