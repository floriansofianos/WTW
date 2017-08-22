﻿import { HttpModule, Http } from "@angular/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MdProgressBarModule } from '@angular/material'
import { StarRatingModule } from 'angular-star-rating';
import { APP_INITIALIZER } from '@angular/core';

import { appRoutes } from './routes';

import { MainAppComponent } from './main-app.component';
import { HomePageComponent } from './home/home-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignUpPageComponent } from './signup/signup-page.component';
import { SignUpFormComponent } from './signup/signup-form/signup-form.component';
import { ConfirmPasswordValidator } from './signup/signup-form/confirm-password-validator.directive';
import { EmailValidator } from './signup/signup-form/email-validator.directive';
import { UsernameValidator } from './signup/signup-form/username-validator.directive';
import { UserHomePageComponent } from './user-home/user-home-page.component';
import { UserWelcomePageComponent } from './user-welcome/user-welcome-page.component';
import { FirstQuestionnaireComponent } from './first-questionnaire/first-questionnaire.component';
import { WtwButtonComponent } from './button/wtw.button.component';
import { MovieQuestionnaireComponent } from './movie/movie-questionnaire.component';

import { SpinnerModule } from 'angular2-spinner';
import { UiSwitchModule } from 'angular2-ui-switch';
import { NouisliderModule } from 'ng2-nouislider';


import { AuthService } from './auth/auth.service';
import { FirstQuestionnaireService } from './first-questionnaire/first-questionnaire.service';
import { MovieQuestionnaireService } from './movie/movie-questionnaire.service';
import { CanActivateAuthGuard } from './auth/can-activate.auth';

// AoT requires an exported function for factories
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
    imports: [BrowserModule,
            BrowserAnimationsModule,
            MdProgressBarModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forRoot(appRoutes),
            HttpModule,
            SpinnerModule,
            UiSwitchModule,
            NouisliderModule,
            StarRatingModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [Http]
                }
            })],
    declarations: [MainAppComponent,
        HomePageComponent,
        LoginPageComponent,
        LoginFormComponent,
        SignUpPageComponent,
        SignUpFormComponent,
        ConfirmPasswordValidator,
        EmailValidator,
        UsernameValidator,
        UserHomePageComponent,
        UserWelcomePageComponent,
        FirstQuestionnaireComponent,
        WtwButtonComponent,
        MovieQuestionnaireComponent],
    providers: [AuthService,
        FirstQuestionnaireService,
        MovieQuestionnaireService,
        CanActivateAuthGuard,
        {
            provide: APP_INITIALIZER,
            useFactory: (authService: AuthService) => function () { return authService.load() },
            deps: [AuthService],
            multi: true
        }],
    bootstrap: [MainAppComponent]
})

export class AppModule { }