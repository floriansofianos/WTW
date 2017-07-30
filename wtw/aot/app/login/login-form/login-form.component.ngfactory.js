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
import * as import0 from '../../../../app/login/login-form/login-form.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/router/src/router';
import * as import9 from '../../../../app/auth/auth.service';
import * as import10 from '@ngx-translate/core/src/translate.pipe';
import * as import11 from '@angular/core/src/linker/view_container';
import * as import12 from '@angular/core/src/change_detection/change_detection_util';
import * as import13 from '@ngx-translate/core/src/translate.service';
import * as import14 from '../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import15 from '../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import16 from '../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import17 from '../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_name.ngfactory';
import * as import18 from '../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import19 from '@angular/core/src/linker/element_ref';
import * as import20 from '@angular/core/src/linker/template_ref';
import * as import21 from '@angular/forms/src/directives/default_value_accessor';
import * as import22 from '@angular/forms/src/directives/control_value_accessor';
import * as import23 from '@angular/forms/src/directives/reactive_directives/form_control_name';
import * as import24 from '@angular/forms/src/directives/ng_control';
import * as import25 from '@angular/forms/src/directives/ng_control_status';
import * as import26 from '@angular/common/src/directives/ng_if';
import * as import27 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import28 from '@angular/forms/src/directives/control_container';
var Wrapper_LoginFormComponent = (function () {
    function Wrapper_LoginFormComponent(p0, p1) {
        this._changed = false;
        this.context = new import0.LoginFormComponent(p0, p1);
    }
    Wrapper_LoginFormComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_LoginFormComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_LoginFormComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_LoginFormComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_LoginFormComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_LoginFormComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_LoginFormComponent;
}());
export { Wrapper_LoginFormComponent };
var renderType_LoginFormComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_LoginFormComponent_Host0 = (function (_super) {
    __extends(View_LoginFormComponent_Host0, _super);
    function View_LoginFormComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_LoginFormComponent_Host0, renderType_LoginFormComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_LoginFormComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'login-form', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_LoginFormComponent0(this.viewUtils, this, 0, this._el_0);
        this._LoginFormComponent_0_3 = new Wrapper_LoginFormComponent(this.injectorGet(import8.Router, this.parentIndex), this.injectorGet(import9.AuthService, this.parentIndex));
        this.compView_0.create(this._LoginFormComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._LoginFormComponent_0_3.context);
    };
    View_LoginFormComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.LoginFormComponent) && (0 === requestNodeIndex))) {
            return this._LoginFormComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_LoginFormComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._LoginFormComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_LoginFormComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_LoginFormComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_LoginFormComponent_Host0;
}(import1.AppView));
export var LoginFormComponentNgFactory = new import7.ComponentFactory('login-form', View_LoginFormComponent_Host0, import0.LoginFormComponent);
var styles_LoginFormComponent = [];
var View_LoginFormComponent1 = (function (_super) {
    __extends(View_LoginFormComponent1, _super);
    function View_LoginFormComponent1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        var _this = _super.call(this, View_LoginFormComponent1, renderType_LoginFormComponent, import5.ViewType.EMBEDDED, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways, declaredViewContainer) || this;
        _this._expr_2 = import12.UNINITIALIZED;
        return _this;
    }
    View_LoginFormComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.createRenderElement(this.renderer, null, 'div', import3.EMPTY_INLINE_ARRAY, null);
        this._text_1 = this.renderer.createText(this._el_0, '', null);
        this._pipe_translate_0 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService, this.parentIndex), this.parentView.ref);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1
        ]), null);
        return null;
    };
    View_LoginFormComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        var valUnwrapper = new import12.ValueUnwrapper();
        valUnwrapper.reset();
        var currVal_2 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_0.transform('LOGIN.FORM.WRONGPASSWORD')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_2, currVal_2))) {
            this.renderer.setText(this._text_1, currVal_2);
            this._expr_2 = currVal_2;
        }
    };
    View_LoginFormComponent1.prototype.destroyInternal = function () {
        this._pipe_translate_0.ngOnDestroy();
    };
    View_LoginFormComponent1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_LoginFormComponent1;
}(import1.AppView));
var renderType_LoginFormComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_LoginFormComponent, {});
var View_LoginFormComponent0 = (function (_super) {
    __extends(View_LoginFormComponent0, _super);
    function View_LoginFormComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_LoginFormComponent0, renderType_LoginFormComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_38 = import12.UNINITIALIZED;
        _this._expr_40 = import12.UNINITIALIZED;
        _this._expr_42 = import12.UNINITIALIZED;
        _this._expr_44 = import12.UNINITIALIZED;
        return _this;
    }
    View_LoginFormComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_1 = import3.createRenderElement(this.renderer, parentRenderNode, 'form', new import3.InlineArray4(4, 'autocomplete', 'off', 'novalidate', ''), null);
        this._FormGroupDirective_1_3 = new import14.Wrapper_FormGroupDirective(null, null);
        this._ControlContainer_1_4 = this._FormGroupDirective_1_3.context;
        this._NgControlStatusGroup_1_5 = new import15.Wrapper_NgControlStatusGroup(this._ControlContainer_1_4);
        this._text_2 = this.renderer.createText(this._el_1, '\n    ', null);
        this._el_3 = import3.createRenderElement(this.renderer, this._el_1, 'p', new import3.InlineArray2(2, 'class', 'form-group'), null);
        this._text_4 = this.renderer.createText(this._el_3, '\n        ', null);
        this._el_5 = import3.createRenderElement(this.renderer, this._el_3, 'input', new import3.InlineArray8(6, 'formControlName', 'login', 'id', 'login', 'type', 'text'), null);
        this._DefaultValueAccessor_5_3 = new import16.Wrapper_DefaultValueAccessor(this.renderer, new import19.ElementRef(this._el_5));
        this._NG_VALUE_ACCESSOR_5_4 = [this._DefaultValueAccessor_5_3.context];
        this._FormControlName_5_5 = new import17.Wrapper_FormControlName(this._ControlContainer_1_4, null, null, this._NG_VALUE_ACCESSOR_5_4);
        this._NgControl_5_6 = this._FormControlName_5_5.context;
        this._NgControlStatus_5_7 = new import15.Wrapper_NgControlStatus(this._NgControl_5_6);
        this._text_6 = this.renderer.createText(this._el_3, '\n    ', null);
        this._text_7 = this.renderer.createText(this._el_1, '\n    ', null);
        this._el_8 = import3.createRenderElement(this.renderer, this._el_1, 'p', new import3.InlineArray2(2, 'class', 'form-group'), null);
        this._text_9 = this.renderer.createText(this._el_8, '\n        ', null);
        this._el_10 = import3.createRenderElement(this.renderer, this._el_8, 'input', new import3.InlineArray8(6, 'formControlName', 'password', 'id', 'password', 'type', 'text'), null);
        this._DefaultValueAccessor_10_3 = new import16.Wrapper_DefaultValueAccessor(this.renderer, new import19.ElementRef(this._el_10));
        this._NG_VALUE_ACCESSOR_10_4 = [this._DefaultValueAccessor_10_3.context];
        this._FormControlName_10_5 = new import17.Wrapper_FormControlName(this._ControlContainer_1_4, null, null, this._NG_VALUE_ACCESSOR_10_4);
        this._NgControl_10_6 = this._FormControlName_10_5.context;
        this._NgControlStatus_10_7 = new import15.Wrapper_NgControlStatus(this._NgControl_10_6);
        this._text_11 = this.renderer.createText(this._el_8, '\n    ', null);
        this._text_12 = this.renderer.createText(this._el_1, '\n    ', null);
        this._anchor_13 = this.renderer.createTemplateAnchor(this._el_1, null);
        this._vc_13 = new import11.ViewContainer(13, 1, this, this._anchor_13);
        this._TemplateRef_13_5 = new import20.TemplateRef_(this, 13, this._anchor_13);
        this._NgIf_13_6 = new import18.Wrapper_NgIf(this._vc_13.vcRef, this._TemplateRef_13_5);
        this._text_14 = this.renderer.createText(this._el_1, '\n    ', null);
        this._el_15 = import3.createRenderElement(this.renderer, this._el_1, 'button', new import3.InlineArray4(4, 'class', 'button-submit', 'type', 'submit'), null);
        this._text_16 = this.renderer.createText(this._el_15, '', null);
        this._text_17 = this.renderer.createText(this._el_1, '\n    ', null);
        this._el_18 = import3.createRenderElement(this.renderer, this._el_1, 'button', new import3.InlineArray4(4, 'class', 'button-cancel', 'type', 'submit'), null);
        this._text_19 = this.renderer.createText(this._el_18, '', null);
        this._text_20 = this.renderer.createText(this._el_1, '\n', null);
        this._text_21 = this.renderer.createText(parentRenderNode, '\n', null);
        var disposable_0 = import3.subscribeToRenderElement(this, this._el_1, new import3.InlineArray8(6, 'ngSubmit', null, 'submit', null, 'reset', null), this.eventHandler(this.handleEvent_1));
        this._FormGroupDirective_1_3.subscribe(this, this.eventHandler(this.handleEvent_1), true);
        var disposable_1 = import3.subscribeToRenderElement(this, this._el_5, new import3.InlineArray4(4, 'input', null, 'blur', null), this.eventHandler(this.handleEvent_5));
        this._pipe_translate_0 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService, this.parentIndex), this.ref);
        var disposable_2 = import3.subscribeToRenderElement(this, this._el_10, new import3.InlineArray4(4, 'input', null, 'blur', null), this.eventHandler(this.handleEvent_10));
        this._pipe_translate_1 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService, this.parentIndex), this.ref);
        this._pipe_translate_2 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService, this.parentIndex), this.ref);
        var disposable_3 = import3.subscribeToRenderElement(this, this._el_18, new import3.InlineArray2(2, 'click', null), this.eventHandler(this.handleEvent_18));
        this._pipe_translate_3 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService, this.parentIndex), this.ref);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._text_0,
            this._el_1,
            this._text_2,
            this._el_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._text_12,
            this._anchor_13,
            this._text_14,
            this._el_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._text_20,
            this._text_21
        ]), [
            disposable_0,
            disposable_1,
            disposable_2,
            disposable_3
        ]);
        return null;
    };
    View_LoginFormComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import21.DefaultValueAccessor) && (5 === requestNodeIndex))) {
            return this._DefaultValueAccessor_5_3.context;
        }
        if (((token === import22.NG_VALUE_ACCESSOR) && (5 === requestNodeIndex))) {
            return this._NG_VALUE_ACCESSOR_5_4;
        }
        if (((token === import23.FormControlName) && (5 === requestNodeIndex))) {
            return this._FormControlName_5_5.context;
        }
        if (((token === import24.NgControl) && (5 === requestNodeIndex))) {
            return this._NgControl_5_6;
        }
        if (((token === import25.NgControlStatus) && (5 === requestNodeIndex))) {
            return this._NgControlStatus_5_7.context;
        }
        if (((token === import21.DefaultValueAccessor) && (10 === requestNodeIndex))) {
            return this._DefaultValueAccessor_10_3.context;
        }
        if (((token === import22.NG_VALUE_ACCESSOR) && (10 === requestNodeIndex))) {
            return this._NG_VALUE_ACCESSOR_10_4;
        }
        if (((token === import23.FormControlName) && (10 === requestNodeIndex))) {
            return this._FormControlName_10_5.context;
        }
        if (((token === import24.NgControl) && (10 === requestNodeIndex))) {
            return this._NgControl_10_6;
        }
        if (((token === import25.NgControlStatus) && (10 === requestNodeIndex))) {
            return this._NgControlStatus_10_7.context;
        }
        if (((token === import20.TemplateRef) && (13 === requestNodeIndex))) {
            return this._TemplateRef_13_5;
        }
        if (((token === import26.NgIf) && (13 === requestNodeIndex))) {
            return this._NgIf_13_6.context;
        }
        if (((token === import27.FormGroupDirective) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._FormGroupDirective_1_3.context;
        }
        if (((token === import28.ControlContainer) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._ControlContainer_1_4;
        }
        if (((token === import25.NgControlStatusGroup) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._NgControlStatusGroup_1_5.context;
        }
        return notFoundResult;
    };
    View_LoginFormComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var valUnwrapper = new import12.ValueUnwrapper();
        var currVal_1_0_0 = this.context.loginForm;
        this._FormGroupDirective_1_3.check_form(currVal_1_0_0, throwOnChange, false);
        this._FormGroupDirective_1_3.ngDoCheck(this, this._el_1, throwOnChange);
        this._NgControlStatusGroup_1_5.ngDoCheck(this, this._el_1, throwOnChange);
        this._DefaultValueAccessor_5_3.ngDoCheck(this, this._el_5, throwOnChange);
        var currVal_5_1_0 = 'login';
        this._FormControlName_5_5.check_name(currVal_5_1_0, throwOnChange, false);
        this._FormControlName_5_5.ngDoCheck(this, this._el_5, throwOnChange);
        this._NgControlStatus_5_7.ngDoCheck(this, this._el_5, throwOnChange);
        this._DefaultValueAccessor_10_3.ngDoCheck(this, this._el_10, throwOnChange);
        var currVal_10_1_0 = 'password';
        this._FormControlName_10_5.check_name(currVal_10_1_0, throwOnChange, false);
        this._FormControlName_10_5.ngDoCheck(this, this._el_10, throwOnChange);
        this._NgControlStatus_10_7.ngDoCheck(this, this._el_10, throwOnChange);
        var currVal_13_0_0 = this.context.showError;
        this._NgIf_13_6.check_ngIf(currVal_13_0_0, throwOnChange, false);
        this._NgIf_13_6.ngDoCheck(this, this._anchor_13, throwOnChange);
        this._vc_13.detectChangesInNestedViews(throwOnChange);
        this._NgControlStatusGroup_1_5.checkHost(this, this, this._el_1, throwOnChange);
        valUnwrapper.reset();
        var currVal_38 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_0.transform('LOGIN.FORM.LOGIN')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_38, currVal_38))) {
            this.renderer.setElementProperty(this._el_5, 'placeholder', currVal_38);
            this._expr_38 = currVal_38;
        }
        this._NgControlStatus_5_7.checkHost(this, this, this._el_5, throwOnChange);
        valUnwrapper.reset();
        var currVal_40 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_1.transform('LOGIN.FORM.PASSWORD')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_40, currVal_40))) {
            this.renderer.setElementProperty(this._el_10, 'placeholder', currVal_40);
            this._expr_40 = currVal_40;
        }
        this._NgControlStatus_10_7.checkHost(this, this, this._el_10, throwOnChange);
        valUnwrapper.reset();
        var currVal_42 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_2.transform('FORM.OK')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_42, currVal_42))) {
            this.renderer.setText(this._text_16, currVal_42);
            this._expr_42 = currVal_42;
        }
        valUnwrapper.reset();
        var currVal_44 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_3.transform('FORM.CANCEL')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_44, currVal_44))) {
            this.renderer.setText(this._text_19, currVal_44);
            this._expr_44 = currVal_44;
        }
    };
    View_LoginFormComponent0.prototype.destroyInternal = function () {
        this._vc_13.destroyNestedViews();
        this._FormControlName_5_5.ngOnDestroy();
        this._FormControlName_10_5.ngOnDestroy();
        this._FormGroupDirective_1_3.ngOnDestroy();
        this._pipe_translate_0.ngOnDestroy();
        this._pipe_translate_1.ngOnDestroy();
        this._pipe_translate_2.ngOnDestroy();
        this._pipe_translate_3.ngOnDestroy();
    };
    View_LoginFormComponent0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 13)) {
            return new View_LoginFormComponent1(this.viewUtils, this, 13, this._anchor_13, this._vc_13);
        }
        return null;
    };
    View_LoginFormComponent0.prototype.handleEvent_1 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._FormGroupDirective_1_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'ngSubmit')) {
            var pd_sub_0 = (this.context.login(this.context.loginForm.value) !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_LoginFormComponent0.prototype.handleEvent_5 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._DefaultValueAccessor_5_3.handleEvent(eventName, $event) && result);
        return result;
    };
    View_LoginFormComponent0.prototype.handleEvent_10 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._DefaultValueAccessor_10_3.handleEvent(eventName, $event) && result);
        return result;
    };
    View_LoginFormComponent0.prototype.handleEvent_18 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.context.cancel() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_LoginFormComponent0;
}(import1.AppView));
export { View_LoginFormComponent0 };
//# sourceMappingURL=login-form.component.ngfactory.js.map