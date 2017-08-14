import { Routes } from '@angular/router'
import { LoginPageComponent } from './login/login-page.component';
import { HomePageComponent } from './home/home-page.component';
import { SignUpPageComponent } from './signup/signup-page.component';
import { UserHomePageComponent } from './user-home/user-home-page.component';
import { CanActivateAuthGuard } from './auth/can-activate.auth';

export const appRoutes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'user/home', component: UserHomePageComponent, canActivate: [ CanActivateAuthGuard ] },
    { path: '', component: HomePageComponent }
]