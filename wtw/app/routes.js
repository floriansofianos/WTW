"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_page_component_1 = require("./login/login-page.component");
var home_page_component_1 = require("./home/home-page.component");
exports.appRoutes = [
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: '', component: home_page_component_1.HomePageComponent }
];
