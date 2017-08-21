var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var animations_1 = require('@angular/animations');
var FirstQuestionnaireComponent = (function () {
    function FirstQuestionnaireComponent(authService, translate, router, firstQuestionnaireService) {
        this.authService = authService;
        this.translate = translate;
        this.router = router;
        this.firstQuestionnaireService = firstQuestionnaireService;
        this.states = ['active', null, null];
    }
    FirstQuestionnaireComponent.prototype.ngOnInit = function () {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser.age)
            this.age = currentUser.age;
        else
            this.age = 30;
    };
    FirstQuestionnaireComponent.prototype.setTranslation = function (lang) {
        this.translate.use(lang);
    };
    FirstQuestionnaireComponent.prototype.isTranslation = function (lang) {
        return this.translate.currentLang === lang;
    };
    FirstQuestionnaireComponent.prototype.langSkip = function () {
        this.setStateActive(1);
    };
    FirstQuestionnaireComponent.prototype.ageSkip = function () {
        this.resetAllStates();
    };
    FirstQuestionnaireComponent.prototype.langConfirm = function () {
        var _this = this;
        this.showSpinner = true;
        // Save data in DB
        this.authService.setUserProperty('lang', this.translate.currentLang).subscribe(function (response) {
            _this.setStateActive(1);
            _this.showSpinner = false;
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    FirstQuestionnaireComponent.prototype.agePrevious = function () {
        this.setStateActive(0);
    };
    FirstQuestionnaireComponent.prototype.ageConfirm = function () {
        var _this = this;
        this.showSpinner = true;
        // Save data in DB
        if (this.age)
            this.authService.setUserProperty('age', this.age).subscribe(function (response) {
                _this.firstQuestionnaireService.getMovieDBConfiguration().subscribe(function (response) {
                    _this.configuration = response.json();
                    _this.firstQuestionnaireService.getFirstQuestionnaireMovie(_this.translate.currentLang).subscribe(function (response) {
                        _this.movie = response.json();
                        _this.setStateActive(2);
                        _this.showSpinner = false;
                    }, function (error) {
                        _this.router.navigate(['error']);
                    });
                }, function (error) {
                    _this.router.navigate(['error']);
                });
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    FirstQuestionnaireComponent.prototype.movieQuestionnaireChange = function (data) {
        this.movieQuestionnaire = data;
    };
    FirstQuestionnaireComponent.prototype.movieConfirm = function () {
        this.showSpinner = true;
        // Save data in DB
    };
    FirstQuestionnaireComponent.prototype.setStateActive = function (i) {
        this.resetAllStates();
        this.states[i] = 'active';
    };
    FirstQuestionnaireComponent.prototype.resetAllStates = function () {
        this.states.forEach(function (o, i, a) { return a[i] = null; });
    };
    FirstQuestionnaireComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'first-questionnaire',
            templateUrl: 'first-questionnaire.component.html',
            animations: [
                animations_1.trigger('areaState', [
                    animations_1.state('active', animations_1.style({
                        opacity: 1,
                        transform: 'translateX(-50%)'
                    })),
                    animations_1.transition('void => *', [
                        animations_1.style({
                            transform: 'translateX(-150%)',
                            opacity: 0
                        }),
                        animations_1.animate('100ms 300ms ease-in')
                    ]),
                    animations_1.transition('* => void', [
                        animations_1.animate(300, animations_1.keyframes([
                            animations_1.style({ opacity: 1, transform: 'translateX(-50%)', offset: 0 }),
                            animations_1.style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                            animations_1.style({ opacity: 0, transform: 'translateX(150%)', offset: 1.0 })
                        ]))
                    ])
                ])
            ]
        })
    ], FirstQuestionnaireComponent);
    return FirstQuestionnaireComponent;
})();
exports.FirstQuestionnaireComponent = FirstQuestionnaireComponent;
//# sourceMappingURL=first-questionnaire.component.js.map