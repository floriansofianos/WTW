﻿import { Routes } from '@angular/router'
import { LoginPageComponent } from './login/login-page.component';
import { HomePageComponent } from './home/home-page.component';
import { SignUpPageComponent } from './signup/signup-page.component';
import { UserWelcomePageComponent } from './user-welcome/user-welcome-page.component';
import { UserHomePageComponent } from './user-home/user-home-page.component';
import { UserMoviesHomePageComponent } from './user-movies-home/user-movies-home-page.component';
import { UserTVShowsHomePageComponent } from './user-tvshows-home/user-tvshows-home-page.component';
import { UserMoviesQuestionnairesPageComponent } from './user-movies-questionnaires/user-movies-questionnaires-page.component';
import { UserTVQuestionnairesPageComponent } from './user-tv-questionnaires/user-tv-questionnaires-page.component';
import { DummyUserMoviesQuestionnairesComponent } from './user-movies-questionnaires/user-movies-questionnaires-dummy-page.component';
import { DummyUserTVQuestionnairesComponent } from './user-tv-questionnaires/user-tv-questionnaires-dummy-page.component';
import { UserMoviesWatchlistPageComponent } from './user-movies-watchlist/user-movies-watchlist-page.component';
import { UserTVWatchlistPageComponent } from './user-tv-watchlist/user-tv-watchlist-page.component';
import { UserWhatToWatchPageComponent } from './user-what-to-watch/user-what-to-watch-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { ErrorPageComponent } from './error/error-page.component';
import { SocialPageComponent } from './social/social-page.component';
import { UserPageComponent } from './user/user-page.component';
import { CanActivateAuthGuard } from './auth/can-activate.auth';
import { MoviePageComponent } from './movie/movie.component';
import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
import { TVShowPageComponent } from './tv/tvshow.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'auth/changePassword', component: ForgotPasswordPageComponent },
    { path: 'user/welcome', component: UserWelcomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/profile', component: UserProfilePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/home', component: UserHomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/what-to-watch', component: UserWhatToWatchPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/home', component: UserMoviesHomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/tvshows/home', component: UserTVShowsHomePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/questionnaires', component: UserMoviesQuestionnairesPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/dummyQuestionnaires', component: DummyUserMoviesQuestionnairesComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/tvshows/dummyQuestionnaires', component: DummyUserTVQuestionnairesComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/movies/watchlist', component: UserMoviesWatchlistPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/tvshows/watchlist', component: UserTVWatchlistPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/tvshows/questionnaires', component: UserTVQuestionnairesPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/social', component: SocialPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'user/:id', component: UserPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'movie/:id', component: MoviePageComponent, canActivate: [CanActivateAuthGuard] },
    { path: 'tvshow/:id', component: TVShowPageComponent, canActivate: [CanActivateAuthGuard] },
    { path: '', component: HomePageComponent }
]