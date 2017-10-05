﻿import { Routes } from '@angular/router'
import { LoginPageComponent } from './login/login-page.component';
import { HomePageComponent } from './home/home-page.component';
import { SignUpPageComponent } from './signup/signup-page.component';
import { UserWelcomePageComponent } from './user-welcome/user-welcome-page.component';
import { UserHomePageComponent } from './user-home/user-home-page.component';
import { UserMoviesHomePageComponent } from './user-movies-home/user-movies-home-page.component';
import { UserMoviesQuestionnairesPageComponent } from './user-movies-questionnaires/user-movies-questionnaires-page.component';
import { DummyUserMoviesQuestionnairesComponent } from './user-movies-questionnaires/user-movies-questionnaires-dummy-page.component';
import { UserMoviesWatchlistPageComponent } from './user-movies-watchlist/user-movies-watchlist-page.component';
import { CanActivateAuthGuard } from './auth/can-activate.auth';

export const appRoutes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'user/welcome', component: UserWelcomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/home', component: UserHomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/home', component: UserMoviesHomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/questionnaires', component: UserMoviesQuestionnairesPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/dummyQuestionnaires', component: DummyUserMoviesQuestionnairesComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/watchlist', component: UserMoviesWatchlistPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: '', component: HomePageComponent }
]