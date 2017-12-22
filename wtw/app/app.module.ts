import { HttpModule, Http } from "@angular/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatSliderModule, MatTooltipModule } from '@angular/material'
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
import { PasswordValidator } from './signup/signup-form/password-validator.directive';
import { EmailValidator } from './signup/signup-form/email-validator.directive';
import { UsernameValidator } from './signup/signup-form/username-validator.directive';
import { UserHomePageComponent } from './user-home/user-home-page.component';
import { UserWelcomePageComponent } from './user-welcome/user-welcome-page.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { WtwButtonComponent } from './button/wtw.button.component';
import { MovieQuestionnaireComponent } from './movie/movie-questionnaire.component';
import { MovieRecommandationComponent } from './movie/movie-recommandation.component';
import { CastMemberComponent } from './movie/cast-member.component';
import { ForgotPasswordFormComponent } from './forgot-password/forgot-password-form/forgot-password-form.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LogoComponent } from './logo/logo.component';
import { SpinnerModule } from 'angular2-spinner';
import { UiSwitchModule } from 'angular2-ui-switch';
import { NouisliderModule } from 'ng2-nouislider';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { UserMoviesHomePageComponent } from './user-movies-home/user-movies-home-page.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { UserMoviesQuestionnairesPageComponent } from './user-movies-questionnaires/user-movies-questionnaires-page.component';
import { DummyUserMoviesQuestionnairesComponent } from './user-movies-questionnaires/user-movies-questionnaires-dummy-page.component';
import { UserMoviesWatchlistPageComponent } from './user-movies-watchlist/user-movies-watchlist-page.component';
import { UserWhatToWatchPageComponent } from './user-what-to-watch/user-what-to-watch-page.component';
import { MovieWallComponent } from './movie-wall/movie-wall.component';
import { MovieWallElementComponent } from './movie-wall/movie-wall-element.component';
import { ErrorPageComponent } from './error/error-page.component';
import { SocialPageComponent } from './social/social-page.component';
import { UserPageComponent } from './user/user-page.component';
import { AlsoLikeComponent } from './also-like/also-like.component';
import { MoviePageComponent } from './movie/movie.component';
import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
import { TopMenuNotificationsComponent } from './notification/top-menu-notifications.component';


import { AuthService } from './auth/auth.service';
import { QuestionnaireService } from './questionnaire/questionnaire.service';
import { MovieQuestionnaireService } from './movie/movie-questionnaire.service';
import { CanActivateAuthGuard } from './auth/can-activate.auth';
import { MovieDBService } from './movieDB/movieDB.service';
import { UserQuestionnaireService } from './questionnaire/user-questionnaire.service';
import { MovieRecommandationService } from './movie/movie-recommandation.service';
import { CountriesService } from './countries/countries.service';
import { LanguagesService } from './languages/languages.service';
import { SocialService } from './social/social.service';
import { UserService } from './user/user.service';
import { NotificationService } from './notification/notification.service';
import { TimelineService } from './timeline/timeline.service';

// AoT requires an exported function for factories
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
    imports: [BrowserModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSliderModule,
        MatTooltipModule,
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
        PasswordValidator,
        EmailValidator,
        UsernameValidator,
        UserHomePageComponent,
        UserWelcomePageComponent,
        QuestionnaireComponent,
        WtwButtonComponent,
        MovieQuestionnaireComponent,
        MovieRecommandationComponent,
        LogoComponent,
        ForgotPasswordFormComponent,
        TopMenuComponent,
        UserMoviesHomePageComponent,
        LeftMenuComponent,
        UserMoviesQuestionnairesPageComponent,
        DummyUserMoviesQuestionnairesComponent,
        UserMoviesWatchlistPageComponent,
        UserWhatToWatchPageComponent,
        MovieWallComponent,
        MovieWallElementComponent,
        ForgotPasswordPageComponent,
        ErrorPageComponent,
        SocialPageComponent,
        MoviePageComponent,
        UserProfilePageComponent,
        UserPageComponent,
        AlsoLikeComponent,
        TopMenuNotificationsComponent,
        CastMemberComponent],
    providers: [AuthService,
        QuestionnaireService,
        MovieQuestionnaireService,
        MovieDBService,
        UserQuestionnaireService,
        MovieRecommandationService,
        CountriesService,
        LanguagesService,
        SocialService,
        NotificationService,
        TimelineService,
        UserService,
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