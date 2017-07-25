var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as import0 from '../../../app/login/login-page.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../app/login/login-form/login-form.component';
import * as import9 from './login-form/login-form.component.ngfactory';
import * as import10 from '@ngx-translate/core/src/translate.pipe';
import * as import11 from '@angular/core/src/change_detection/change_detection_util';
import * as import12 from '@angular/router/src/router';
import * as import13 from '../../../app/auth/auth.service';
import * as import14 from '@ngx-translate/core/src/translate.service';
var Wrapper_LoginPageComponent = (function () {
    function Wrapper_LoginPageComponent() {
        this._changed = false;
        this.context = new import0.LoginPageComponent();
    }
    Wrapper_LoginPageComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_LoginPageComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_LoginPageComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_LoginPageComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_LoginPageComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_LoginPageComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_LoginPageComponent;
}());
export { Wrapper_LoginPageComponent };
var renderType_LoginPageComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_LoginPageComponent_Host0 = (function (_super) {
    __extends(View_LoginPageComponent_Host0, _super);
    function View_LoginPageComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_LoginPageComponent_Host0, renderType_LoginPageComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_LoginPageComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'ng-component', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_LoginPageComponent0(this.viewUtils, this, 0, this._el_0);
        this._LoginPageComponent_0_3 = new Wrapper_LoginPageComponent();
        this.compView_0.create(this._LoginPageComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._LoginPageComponent_0_3.context);
    };
    View_LoginPageComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.LoginPageComponent) && (0 === requestNodeIndex))) {
            return this._LoginPageComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_LoginPageComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._LoginPageComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_LoginPageComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_LoginPageComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_LoginPageComponent_Host0;
}(import1.AppView));
export var LoginPageComponentNgFactory = new import7.ComponentFactory('ng-component', View_LoginPageComponent_Host0, import0.LoginPageComponent);
var styles_LoginPageComponent = [];
var renderType_LoginPageComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_LoginPageComponent, {});
var View_LoginPageComponent0 = (function (_super) {
    __extends(View_LoginPageComponent0, _super);
    function View_LoginPageComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_LoginPageComponent0, renderType_LoginPageComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_8 = import11.UNINITIALIZED;
        return _this;
    }
    View_LoginPageComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_1 = import3.createRenderElement(this.renderer, parentRenderNode, 'h2', import3.EMPTY_INLINE_ARRAY, null);
        this._text_2 = this.renderer.createText(this._el_1, '', null);
        this._text_3 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_4 = import3.createRenderElement(this.renderer, parentRenderNode, 'login-form', import3.EMPTY_INLINE_ARRAY, null);
        this.compView_4 = new import9.View_LoginFormComponent0(this.viewUtils, this, 4, this._el_4);
        this._LoginFormComponent_4_3 = new import9.Wrapper_LoginFormComponent(this.parentView.injectorGet(import12.Router, this.parentIndex), this.parentView.injectorGet(import13.AuthService, this.parentIndex));
        this.compView_4.create(this._LoginFormComponent_4_3.context);
        this._text_5 = this.renderer.createText(parentRenderNode, '\n', null);
        this._pipe_translate_0 = new import10.TranslatePipe(this.parentView.injectorGet(import14.TranslateService, this.parentIndex), this.ref);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._text_0,
            this._el_1,
            this._text_2,
            this._text_3,
            this._el_4,
            this._text_5
        ]), null);
        return null;
    };
    View_LoginPageComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import8.LoginFormComponent) && (4 === requestNodeIndex))) {
            return this._LoginFormComponent_4_3.context;
        }
        return notFoundResult;
    };
    View_LoginPageComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var valUnwrapper = new import11.ValueUnwrapper();
        this._LoginFormComponent_4_3.ngDoCheck(this, this._el_4, throwOnChange);
        valUnwrapper.reset();
        var currVal_8 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_0.transform('LOGIN.TITLE')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_8, currVal_8))) {
            this.renderer.setText(this._text_2, currVal_8);
            this._expr_8 = currVal_8;
        }
        this.compView_4.internalDetectChanges(throwOnChange);
    };
    View_LoginPageComponent0.prototype.destroyInternal = function () {
        this.compView_4.destroy();
        this._pipe_translate_0.ngOnDestroy();
    };
    return View_LoginPageComponent0;
}(import1.AppView));
export { View_LoginPageComponent0 };
//# sourceMappingURL=login-page.component.ngfactory.js.map