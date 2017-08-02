import { Routes } from '@angular/router'
import { LoginPageComponent } from './login/login-page.component';
import { HomePageComponent } from './home/home-page.component';
import { SignUpPageComponent } from './signup/signup-page.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: '', component: HomePageComponent }
]