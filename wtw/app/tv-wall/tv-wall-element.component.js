"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var TVWallElementComponent = (function () {
    function TVWallElementComponent() {
        this.state = 'normal';
    }
    TVWallElementComponent.prototype.ngOnInit = function () {
        this.height = Math.floor(this.width * 1.5);
        this.fontSize = this.width < 100 ? 30 : (this.width < 200 ? 40 : (this.width < 300 ? 60 : 70));
        this.marginTop = Math.floor(this.height / 2) - Math.floor(this.fontSize / 2);
    };
    TVWallElementComponent.prototype.onMouseOver = function () {
        this.state = 'over';
    };
    TVWallElementComponent.prototype.onMouseOut = function () {
        this.state = 'normal';
    };
    TVWallElementComponent.prototype.onMouseUp = function () {
        this.state = 'over';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TVWallElementComponent.prototype, "tvshow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVWallElementComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TVWallElementComponent.prototype, "width", void 0);
    TVWallElementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tv-wall-element',
            templateUrl: 'tv-wall-element.component.html',
            animations: [
                animations_1.trigger('posterState', [
                    animations_1.state('normal', animations_1.style({
                        transform: 'scale(1)',
                        opacity: 1
                    })),
                    animations_1.state('over', animations_1.style({
                        transform: 'scale(1.1)',
                        opacity: 0.2
                    })),
                    animations_1.transition('* => *', animations_1.animate('100ms ease-in'))
                ]),
                animations_1.trigger('titleState', [
                    animations_1.state('normal', animations_1.style({
                        opacity: 0
                    })),
                    animations_1.state('over', animations_1.style({
                        opacity: 1
                    })),
                    animations_1.transition('* => *', animations_1.animate('100ms ease-in'))
                ])
            ]
        })
    ], TVWallElementComponent);
    return TVWallElementComponent;
}());
exports.TVWallElementComponent = TVWallElementComponent;
//# sourceMappingURL=tv-wall-element.component.js.map