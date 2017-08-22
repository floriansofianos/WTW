"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_page_component_1 = require("./login/login-page.component");
var home_page_component_1 = require("./home/home-page.component");
var signup_page_component_1 = require("./signup/signup-page.component");
var user_welcome_page_component_1 = require("./user-welcome/user-welcome-page.component");
var user_home_page_component_1 = require("./user-home/user-home-page.component");
var can_activate_auth_1 = require("./auth/can-activate.auth");
exports.appRoutes = [
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: 'signup', component: signup_page_component_1.SignUpPageComponent },
    { path: 'user/welcome', component: user_welcome_page_component_1.UserWelcomePageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: 'user/home', component: user_home_page_component_1.UserHomePageComponent, canActivate: [can_activate_auth_1.CanActivateAuthGuard] },
    { path: '', component: home_page_component_1.HomePageComponent }
];
