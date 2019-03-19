import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  errorMessage: string | null;

  constructor( private authService: AuthService,  private router: Router) {
  }

  ngOnInit() {
    if(this.authService.getToken()){
      this.router.navigateByUrl('/timelin');
    }
  };

  onSubmit(): void {
    if(this.user.name.length < 3) {
      this.errorMessage = 'Nome deve possuir entre 3 e 50 caracteres';
      return
    }

    if(this.user.password.length < 3) {
      this.errorMessage = 'Senha deve possuir entre 5 e 50 caracteres';
      return
    }
    
    this.authService.signUp(this.user.name,this.user.email, this.user.password)
    .subscribe(
      () => {
        this.router.navigateByUrl('/')
      },
      error => this.errorMessage = error.error || 'Verifique os campos e tente novamente'
    )
  }
}
