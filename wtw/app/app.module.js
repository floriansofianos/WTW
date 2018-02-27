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
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var core_3 = require("@angular/core");
var routes_1 = require("./routes");
var main_app_component_1 = require("./main-app.component");
var home_page_component_1 = require("./home/home-page.component");
var login_page_component_1 = require("./login/login-page.component");
var login_form_component_1 = require("./login/login-form/login-form.component");
var signup_page_component_1 = require("./signup/signup-page.component");
var signup_form_component_1 = require("./signup/signup-form/signup-form.component");
var confirm_password_validator_directive_1 = require("./signup/signup-form/confirm-password-validator.directive");
var password_validator_directive_1 = require("./signup/signup-form/password-validator.directive");
var email_validator_directive_1 = require("./signup/signup-form/email-validator.directive");
var username_validator_directive_1 = require("./signup/signup-form/username-validator.directive");
var user_home_page_component_1 = require("./user-home/user-home-page.component");
var user_welcome_page_component_1 = require("./user-welcome/user-welcome-page.component");
var questionnaire_component_1 = require("./questionnaire/questionnaire.component");
var tv_questionnaire_component_1 = require("./tv-questionnaire/tv-questionnaire.component");
var wtw_button_component_1 = require("./button/wtw.button.component");
var movie_questionnaire_component_1 = require("./movie/movie-questionnaire.component");
var tv_questionnaire_element_component_1 = require("./tv/tv-questionnaire-element.component");
var movie_recommandation_component_1 = require("./movie/movie-recommandation.component");
var tv_recommandation_component_1 = require("./tv/tv-recommandation.component");
var cast_member_component_1 = require("./movie/cast-member.component");
var forgot_password_form_component_1 = require("./forgot-password/forgot-password-form/forgot-password-form.component");
var forgot_password_page_component_1 = require("./forgot-password/forgot-password-page.component");
var logo_component_1 = require("./logo/logo.component");
var angular2_spinner_1 = require("angular2-spinner");
var angular2_ui_switch_1 = require("angular2-ui-switch");
var ng2_nouislider_1 = require("ng2-nouislider");
var top_menu_component_1 = require("./top-menu/top-menu.component");
var user_movies_home_page_component_1 = require("./user-movies-home/user-movies-home-page.component");
var user_tvshows_home_page_component_1 = require("./user-tvshows-home/user-tvshows-home-page.component");
var left_menu_component_1 = require("./left-menu/left-menu.component");
var user_movies_questionnaires_page_component_1 = require("./user-movies-questionnaires/user-movies-questionnaires-page.component");
var user_tv_questionnaires_page_component_1 = require("./user-tv-questionnaires/user-tv-questionnaires-page.component");
var user_movies_questionnaires_dummy_page_component_1 = require("./user-movies-questionnaires/user-movies-questionnaires-dummy-page.component");
var user_tv_questionnaires_dummy_page_component_1 = require("./user-tv-questionnaires/user-tv-questionnaires-dummy-page.component");
var user_movies_watchlist_page_component_1 = require("./user-movies-watchlist/user-movies-watchlist-page.component");
var user_tv_watchlist_page_component_1 = require("./user-tv-watchlist/user-tv-watchlist-page.component");
var user_what_to_watch_page_component_1 = require("./user-what-to-watch/user-what-to-watch-page.component");
var movie_wall_component_1 = require("./movie-wall/movie-wall.component");
var movie_wall_element_component_1 = require("./movie-wall/movie-wall-element.component");
var tv_wall_component_1 = require("./tv-wall/tv-wall.component");
var tv_wall_element_component_1 = require("./tv-wall/tv-wall-element.component");
var error_page_component_1 = require("./error/error-page.component");
var social_page_component_1 = require("./social/social-page.component");
var user_page_component_1 = require("./user/user-page.component");
var also_like_component_1 = require("./also-like/also-like.component");
var movie_component_1 = require("./movie/movie.component");
var user_profile_page_component_1 = require("./user-profile/user-profile-page.component");
var top_menu_notifications_component_1 = require("./notification/top-menu-notifications.component");
var timeline_component_1 = require("./timeline/timeline.component");
var timeline_event_follow_component_1 = require("./timeline-event-follow/timeline-event-follow.component");
var timeline_event_friend_component_1 = require("./timeline-event-friend/timeline-event-friend.component");
var timeline_event_rate_movie_component_1 = require("./timeline-event-rate-movie/timeline-event-rate-movie.component");
var tvshow_component_1 = require("./tv/tvshow.component");
var footer_component_1 = require("./footer/footer.component");
var auth_service_1 = require("./auth/auth.service");
var questionnaire_service_1 = require("./questionnaire/questionnaire.service");
var movie_questionnaire_service_1 = require("./movie/movie-questionnaire.service");
var tv_questionnaire_service_1 = require("./tv/tv-questionnaire.service");
var can_activate_auth_1 = require("./auth/can-activate.auth");
var movieDB_service_1 = require("./movieDB/movieDB.service");
var user_questionnaire_service_1 = require("./questionnaire/user-questionnaire.service");
var user_tv_questionnaire_service_1 = require("./tv-questionnaire/user-tv-questionnaire.service");
var movie_recommandation_service_1 = require("./movie/movie-recommandation.service");
var tv_recommandation_service_1 = require("./tv/tv-recommandation.service");
var countries_service_1 = require("./countries/countries.service");
var languages_service_1 = require("./languages/languages.service");
var social_service_1 = require("./social/social.service");
var user_service_1 = require("./user/user.service");
var notification_service_1 = require("./notification/notification.service");
var timeline_service_1 = require("./timeline/timeline.service");
// AoT requires an exported function for factories
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatProgressBarModule,
                material_1.MatInputModule,
                ngx_infinite_scroll_1.InfiniteScrollModule,
                material_1.MatCheckboxModule,
                material_1.MatSelectModule,
                material_1.MatSliderModule,
                material_1.MatTooltipModule,
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
                password_validator_directive_1.PasswordValidator,
                email_validator_directive_1.EmailValidator,
                username_validator_directive_1.UsernameValidator,
                user_home_page_component_1.UserHomePageComponent,
                user_welcome_page_component_1.UserWelcomePageComponent,
                questionnaire_component_1.QuestionnaireComponent,
                tv_questionnaire_component_1.TVQuestionnaireComponent,
                user_tv_questionnaires_dummy_page_component_1.DummyUserTVQuestionnairesComponent,
                wtw_button_component_1.WtwButtonComponent,
                footer_component_1.FooterComponent,
                movie_questionnaire_component_1.MovieQuestionnaireComponent,
                user_tv_questionnaires_page_component_1.UserTVQuestionnairesPageComponent,
                tv_questionnaire_element_component_1.TVQuestionnaireElementComponent,
                movie_recommandation_component_1.MovieRecommandationComponent,
                logo_component_1.LogoComponent,
                forgot_password_form_component_1.ForgotPasswordFormComponent,
                top_menu_component_1.TopMenuComponent,
                user_movies_home_page_component_1.UserMoviesHomePageComponent,
                user_tv_watchlist_page_component_1.UserTVWatchlistPageComponent,
                user_tvshows_home_page_component_1.UserTVShowsHomePageComponent,
                tvshow_component_1.TVShowPageComponent,
                left_menu_component_1.LeftMenuComponent,
                user_movies_questionnaires_page_component_1.UserMoviesQuestionnairesPageComponent,
                user_movies_questionnaires_dummy_page_component_1.DummyUserMoviesQuestionnairesComponent,
                user_movies_watchlist_page_component_1.UserMoviesWatchlistPageComponent,
                user_what_to_watch_page_component_1.UserWhatToWatchPageComponent,
                movie_wall_component_1.MovieWallComponent,
                tv_wall_component_1.TVWallComponent,
                tv_wall_element_component_1.TVWallElementComponent,
                tv_recommandation_component_1.TVRecommandationComponent,
                movie_wall_element_component_1.MovieWallElementComponent,
                forgot_password_page_component_1.ForgotPasswordPageComponent,
                error_page_component_1.ErrorPageComponent,
                social_page_component_1.SocialPageComponent,
                movie_component_1.MoviePageComponent,
                timeline_event_follow_component_1.TimelineEventFollowComponent,
                timeline_event_friend_component_1.TimelineEventFriendComponent,
                timeline_event_rate_movie_component_1.TimelineEventRateMovieComponent,
                user_profile_page_component_1.UserProfilePageComponent,
                user_page_component_1.UserPageComponent,
                timeline_component_1.TimelineComponent,
                also_like_component_1.AlsoLikeComponent,
                top_menu_notifications_component_1.TopMenuNotificationsComponent,
                cast_member_component_1.CastMemberComponent],
            providers: [auth_service_1.AuthService,
                questionnaire_service_1.QuestionnaireService,
                movie_questionnaire_service_1.MovieQuestionnaireService,
                movieDB_service_1.MovieDBService,
                user_questionnaire_service_1.UserQuestionnaireService,
                movie_recommandation_service_1.MovieRecommandationService,
                tv_recommandation_service_1.TVRecommandationService,
                user_tv_questionnaire_service_1.UserTVQuestionnaireService,
                countries_service_1.CountriesService,
                languages_service_1.LanguagesService,
                tv_questionnaire_service_1.TVQuestionnaireService,
                social_service_1.SocialService,
                notification_service_1.NotificationService,
                timeline_service_1.TimelineService,
                user_service_1.UserService,
                can_activate_auth_1.CanActivateAuthGuard,
                {
                    provide: core_3.APP_INITIALIZER,
                    useFactory: function (authService) { return function () { return authService.load().catch(function (err) { console.log(err); }); }; },
                    deps: [auth_service_1.AuthService],
                    multi: true
                }],
            bootstrap: [main_app_component_1.MainAppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
