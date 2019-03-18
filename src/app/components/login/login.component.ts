import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  user: User = new User();
  errorMessage: string | null;

  constructor( private authService: AuthService,  private router: Router) {
  }

  ngOnInit() {
  };

  onSubmit(): void {
    this.authService.logIn(this.user.email, this.user.password)
    .subscribe(
      token => {
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/')
      },
      error => this.errorMessage = error.error
    )
  }
}
