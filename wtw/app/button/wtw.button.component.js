"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var WtwButtonComponent = /** @class */ (function () {
    function WtwButtonComponent() {
        this.state = 'normal';
    }
    WtwButtonComponent.prototype.onClick = function () {
        this.state = 'click';
    };
    WtwButtonComponent.prototype.onMouseOver = function () {
        this.state = 'over';
    };
    WtwButtonComponent.prototype.onMouseOut = function () {
        this.state = 'normal';
    };
    WtwButtonComponent.prototype.onMouseUp = function () {
        this.state = 'over';
    };
    WtwButtonComponent = __decorate([
        core_1.Component({
            selector: 'wtw-button',
            template: "<a class=\"button\" [@buttonState]=\"state\" (click)=\"onClick()\" (mouseup)=\"onMouseUp()\" \n                (mouseout)=\"onMouseOut()\" (mouseover)=\"onMouseOver()\"><ng-content></ng-content></a>",
            animations: [
                animations_1.trigger('buttonState', [
                    animations_1.state('normal', animations_1.style({
                        transform: 'scale(1)'
                    })),
                    animations_1.state('over', animations_1.style({
                        transform: 'scale(1.1)'
                    })),
                    animations_1.state('click', animations_1.style({
                        transform: 'scale(0.9)'
                    })),
                    animations_1.transition('* => *', animations_1.animate('100ms ease-in'))
                ])
            ]
        })
    ], WtwButtonComponent);
    return WtwButtonComponent;
}());
exports.WtwButtonComponent = WtwButtonComponent;
