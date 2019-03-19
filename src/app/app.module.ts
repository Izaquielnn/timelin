import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { HomepageComponent } from './components/homepage/homepage.component';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { TimelineComponent } from './components/timeline/timeline.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
      { path: 'timelin', component: TimelineComponent, canActivate: [AuthGuard] },
      { path: '', component: HomepageComponent },
      { path: '**', redirectTo: '/' }
    ]),
    StoreModule.forRoot({
      event: eventReducer,
      tag: TagReducer
    })
  ],
  providers: [
    AuthService, 
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
