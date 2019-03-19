import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService as AuthGuard, AuthGuardService} from './services/auth-guard.service';
import { reducer as eventReducer}  from './store/reducers/event.reducers';
import { reducer as TagReducer}  from './store/reducers/tag.reducers';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
      
      { path: '**', redirectTo: '/' }
    ]),
    StoreModule.forRoot({
      event: eventReducer,
      tag: TagReducer
    })
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
