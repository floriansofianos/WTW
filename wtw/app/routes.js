"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_page_component_1 = require("./login/login-page.component");
var home_page_component_1 = require("./home/home-page.component");
var signup_page_component_1 = require("./signup/signup-page.component");
var user_welcome_page_component_1 = require("./user-welcome/user-welcome-page.component");
var user_home_page_component_1 = require("./user-home/user-home-page.component");
var user_movies_home_page_component_1 = require("./user-movies-home/user-movies-home-page.component");
var user_movies_questionnaires_page_component_1 = require("./user-movies-questionnaires/user-movies-questionnaires-page.component");
var user_movies_questionnaires_dummy_page_component_1 = require("./user-movies-questionnaires/user-movies-questionnaires-dummy-page.component");
var user_movies_watchlist_page_component_1 = require("./user-movies-watchlist/user-movies-watchlist-page.component");
var user_what_to_watch_page_component_1 = require("./user-what-to-watch/user-what-to-watch-page.component");
var forgot_password_page_component_1 = require("./forgot-password/forgot-password-page.component");
var error_page_component_1 = require("./error/error-page.component");
var social_page_component_1 = require("./social/social-page.component");
var user_page_component_1 = require("./user/user-page.component");
var can_activate_auth_1 = require("./auth/can-activate.auth");
exports.appRoutes = [
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: 'error', component: error_page_component_1.ErrorPageComponent },
    { path: 'signup', component: signup_page_component_1.SignUpPageComponent },
    { path: 'auth/changePassword', component: forgot_password_page_component_1.ForgotPasswordPageComponent },
    { path: 'user/welcome', component: user_welcome_page_component_1.UserWelcomePageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/home', component: user_home_page_component_1.UserHomePageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/what-to-watch', component: user_what_to_watch_page_component_1.UserWhatToWatchPageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/movies/home', component: user_movies_home_page_component_1.UserMoviesHomePageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/movies/questionnaires', component: user_movies_questionnaires_page_component_1.UserMoviesQuestionnairesPageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/movies/dummyQuestionnaires', component: user_movies_questionnaires_dummy_page_component_1.DummyUserMoviesQuestionnairesComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/movies/watchlist', component: user_movies_watchlist_page_component_1.UserMoviesWatchlistPageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/social', component: social_page_component_1.SocialPageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/:id', component: user_page_component_1.UserPageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: '', component: home_page_component_1.HomePageComponent }
];
//# sourceMappingURL=routes.js.map