import { Routes } from '@angular/router'
import { LoginPageComponent } from './login/login-page.component';
import { HomePageComponent } from './home/home-page.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: '', component: HomePageComponent }
]