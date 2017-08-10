"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_page_component_1 = require("./login/login-page.component");
var home_page_component_1 = require("./home/home-page.component");
var signup_page_component_1 = require("./signup/signup-page.component");
var user_home_page_component_1 = require("./user-home/user-home-page.component");
exports.appRoutes = [
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: 'signup', component: signup_page_component_1.SignUpPageComponent },
    { path: 'user/home', component: user_home_page_component_1.UserHomePageComponent },
    { path: '', component: home_page_component_1.HomePageComponent }
];
