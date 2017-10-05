import { HttpModule, Http } from "@angular/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MdProgressBarModule, MdInputModule } from '@angular/material'
import { StarRatingModule } from 'angular-star-rating';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
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
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { WtwButtonComponent } from './button/wtw.button.component';
import { MovieQuestionnaireComponent } from './movie/movie-questionnaire.component';
import { CastMemberComponent } from './movie/cast-member.component';
import { LogoComponent } from './logo/logo.component';
import { SpinnerModule } from 'angular2-spinner';
import { UiSwitchModule } from 'angular2-ui-switch';
import { NouisliderModule } from 'ng2-nouislider';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { UserMoviesHomePageComponent } from './user-movies-home/user-movies-home-page.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { UserMoviesQuestionnairesPageComponent } from './user-movies-questionnaires/user-movies-questionnaires-page.component';
import { DummyUserMoviesQuestionnairesComponent } from './user-movies-questionnaires/user-movies-questionnaires-dummy-page.component';
import { MovieWallComponent } from './movie-wall/movie-wall.component';


import { AuthService } from './auth/auth.service';
import { QuestionnaireService } from './questionnaire/questionnaire.service';
import { MovieQuestionnaireService } from './movie/movie-questionnaire.service';
import { CanActivateAuthGuard } from './auth/can-activate.auth';
import { MovieDBService } from './movieDB/movieDB.service';
import { UserQuestionnaireService } from './questionnaire/user-questionnaire.service';

// AoT requires an exported function for factories
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
    imports: [BrowserModule,
        BrowserAnimationsModule,
        MdProgressBarModule,
        MdInputModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        SpinnerModule,
        UiSwitchModule,
        NouisliderModule,
        StarRatingModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
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
        QuestionnaireComponent,
        WtwButtonComponent,
        MovieQuestionnaireComponent,
        LogoComponent,
        TopMenuComponent,
        UserMoviesHomePageComponent,
        LeftMenuComponent,
        UserMoviesQuestionnairesPageComponent,
        DummyUserMoviesQuestionnairesComponent,
        MovieWallComponent,
        CastMemberComponent],
    providers: [AuthService,
        QuestionnaireService,
        MovieQuestionnaireService,
        MovieDBService,
        UserQuestionnaireService,
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