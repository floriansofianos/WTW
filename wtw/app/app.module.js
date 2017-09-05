"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var material_1 = require("@angular/material");
var angular_star_rating_1 = require("angular-star-rating");
var ngx_modialog_1 = require("ngx-modialog");
var bootstrap_1 = require("ngx-modialog/plugins/bootstrap");
var core_3 = require("@angular/core");
var routes_1 = require("./routes");
var main_app_component_1 = require("./main-app.component");
var home_page_component_1 = require("./home/home-page.component");
var login_page_component_1 = require("./login/login-page.component");
var login_form_component_1 = require("./login/login-form/login-form.component");
var signup_page_component_1 = require("./signup/signup-page.component");
var signup_form_component_1 = require("./signup/signup-form/signup-form.component");
var confirm_password_validator_directive_1 = require("./signup/signup-form/confirm-password-validator.directive");
var email_validator_directive_1 = require("./signup/signup-form/email-validator.directive");
var username_validator_directive_1 = require("./signup/signup-form/username-validator.directive");
var user_home_page_component_1 = require("./user-home/user-home-page.component");
var user_welcome_page_component_1 = require("./user-welcome/user-welcome-page.component");
var first_questionnaire_component_1 = require("./first-questionnaire/first-questionnaire.component");
var wtw_button_component_1 = require("./button/wtw.button.component");
var movie_questionnaire_component_1 = require("./movie/movie-questionnaire.component");
var cast_member_component_1 = require("./movie/cast-member.component");
var logo_component_1 = require("./logo/logo.component");
var angular2_spinner_1 = require("angular2-spinner");
var angular2_ui_switch_1 = require("angular2-ui-switch");
var ng2_nouislider_1 = require("ng2-nouislider");
var top_menu_component_1 = require("./top-menu/top-menu.component");
var auth_service_1 = require("./auth/auth.service");
var first_questionnaire_service_1 = require("./first-questionnaire/first-questionnaire.service");
var movie_questionnaire_service_1 = require("./movie/movie-questionnaire.service");
var can_activate_auth_1 = require("./auth/can-activate.auth");
// AoT requires an exported function for factories
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                material_1.MdProgressBarModule,
                forms_2.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes_1.appRoutes),
                http_1.HttpModule,
                angular2_spinner_1.SpinnerModule,
                angular2_ui_switch_1.UiSwitchModule,
                ng2_nouislider_1.NouisliderModule,
                angular_star_rating_1.StarRatingModule,
                ngx_modialog_1.ModalModule.forRoot(),
                bootstrap_1.BootstrapModalModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.Http]
                    }
                })],
            declarations: [main_app_component_1.MainAppComponent,
                home_page_component_1.HomePageComponent,
                login_page_component_1.LoginPageComponent,
                login_form_component_1.LoginFormComponent,
                signup_page_component_1.SignUpPageComponent,
                signup_form_component_1.SignUpFormComponent,
                confirm_password_validator_directive_1.ConfirmPasswordValidator,
                email_validator_directive_1.EmailValidator,
                username_validator_directive_1.UsernameValidator,
                user_home_page_component_1.UserHomePageComponent,
                user_welcome_page_component_1.UserWelcomePageComponent,
                first_questionnaire_component_1.FirstQuestionnaireComponent,
                wtw_button_component_1.WtwButtonComponent,
                movie_questionnaire_component_1.MovieQuestionnaireComponent,
                logo_component_1.LogoComponent,
                top_menu_component_1.TopMenuComponent,
                cast_member_component_1.CastMemberComponent],
            providers: [auth_service_1.AuthService,
                first_questionnaire_service_1.FirstQuestionnaireService,
                movie_questionnaire_service_1.MovieQuestionnaireService,
                can_activate_auth_1.CanActivateAuthGuard,
                {
                    provide: core_3.APP_INITIALIZER,
                    useFactory: function (authService) { return function () { return authService.load(); }; },
                    deps: [auth_service_1.AuthService],
                    multi: true
                }],
            bootstrap: [main_app_component_1.MainAppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
