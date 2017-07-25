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
import * as import0 from '../../../app/home/home-page.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../app/auth/auth.service';
import * as import9 from '@ngx-translate/core/src/translate.pipe';
import * as import10 from '@angular/core/src/linker/view_container';
import * as import11 from '@angular/core/src/change_detection/change_detection_util';
import * as import12 from '@ngx-translate/core/src/translate.service';
import * as import13 from '../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import14 from '@angular/core/src/linker/template_ref';
import * as import15 from '@angular/common/src/directives/ng_if';
var Wrapper_HomePageComponent = (function () {
    function Wrapper_HomePageComponent(p0) {
        this._changed = false;
        this.context = new import0.HomePageComponent(p0);
    }
    Wrapper_HomePageComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_HomePageComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_HomePageComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_HomePageComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_HomePageComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_HomePageComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_HomePageComponent;
}());
export { Wrapper_HomePageComponent };
var renderType_HomePageComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_HomePageComponent_Host0 = (function (_super) {
    __extends(View_HomePageComponent_Host0, _super);
    function View_HomePageComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_HomePageComponent_Host0, renderType_HomePageComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_HomePageComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'ng-component', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_HomePageComponent0(this.viewUtils, this, 0, this._el_0);
        this._HomePageComponent_0_3 = new Wrapper_HomePageComponent(this.injectorGet(import8.AuthService, this.parentIndex));
        this.compView_0.create(this._HomePageComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._HomePageComponent_0_3.context);
    };
    View_HomePageComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.HomePageComponent) && (0 === requestNodeIndex))) {
            return this._HomePageComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_HomePageComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._HomePageComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_HomePageComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_HomePageComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_HomePageComponent_Host0;
}(import1.AppView));
export var HomePageComponentNgFactory = new import7.ComponentFactory('ng-component', View_HomePageComponent_Host0, import0.HomePageComponent);
var styles_HomePageComponent = [];
var View_HomePageComponent1 = (function (_super) {
    __extends(View_HomePageComponent1, _super);
    function View_HomePageComponent1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        var _this = _super.call(this, View_HomePageComponent1, renderType_HomePageComponent, import5.ViewType.EMBEDDED, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways, declaredViewContainer) || this;
        _this._expr_2 = import11.UNINITIALIZED;
        return _this;
    }
    View_HomePageComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.createRenderElement(this.renderer, null, 'div', import3.EMPTY_INLINE_ARRAY, null);
        this._text_1 = this.renderer.createText(this._el_0, '', null);
        this._pipe_translate_0 = new import9.TranslatePipe(this.parentView.injectorGet(import12.TranslateService, this.parentIndex), this.parentView.ref);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1
        ]), null);
        return null;
    };
    View_HomePageComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        var valUnwrapper = new import11.ValueUnwrapper();
        valUnwrapper.reset();
        var currVal_2 = import3.inlineInterpolate(2, '\n', valUnwrapper.unwrap(this._pipe_translate_0.transform('HOME.WELCOME')), ' ', this.parentView.context.name, '\n');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_2, currVal_2))) {
            this.renderer.setText(this._text_1, currVal_2);
            this._expr_2 = currVal_2;
        }
    };
    View_HomePageComponent1.prototype.destroyInternal = function () {
        this._pipe_translate_0.ngOnDestroy();
    };
    View_HomePageComponent1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_HomePageComponent1;
}(import1.AppView));
var renderType_HomePageComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_HomePageComponent, {});
var View_HomePageComponent0 = (function (_super) {
    __extends(View_HomePageComponent0, _super);
    function View_HomePageComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_HomePageComponent0, renderType_HomePageComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_9 = import11.UNINITIALIZED;
        return _this;
    }
    View_HomePageComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_1 = import3.createRenderElement(this.renderer, parentRenderNode, 'h2', import3.EMPTY_INLINE_ARRAY, null);
        this._text_2 = this.renderer.createText(this._el_1, '', null);
        this._text_3 = this.renderer.createText(parentRenderNode, '\n', null);
        this._anchor_4 = this.renderer.createTemplateAnchor(parentRenderNode, null);
        this._vc_4 = new import10.ViewContainer(4, null, this, this._anchor_4);
        this._TemplateRef_4_5 = new import14.TemplateRef_(this, 4, this._anchor_4);
        this._NgIf_4_6 = new import13.Wrapper_NgIf(this._vc_4.vcRef, this._TemplateRef_4_5);
        this._text_5 = this.renderer.createText(parentRenderNode, '\n', null);
        this._pipe_translate_0 = new import9.TranslatePipe(this.parentView.injectorGet(import12.TranslateService, this.parentIndex), this.ref);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._text_0,
            this._el_1,
            this._text_2,
            this._text_3,
            this._anchor_4,
            this._text_5
        ]), null);
        return null;
    };
    View_HomePageComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import14.TemplateRef) && (4 === requestNodeIndex))) {
            return this._TemplateRef_4_5;
        }
        if (((token === import15.NgIf) && (4 === requestNodeIndex))) {
            return this._NgIf_4_6.context;
        }
        return notFoundResult;
    };
    View_HomePageComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var valUnwrapper = new import11.ValueUnwrapper();
        var currVal_4_0_0 = this.context.name;
        this._NgIf_4_6.check_ngIf(currVal_4_0_0, throwOnChange, false);
        this._NgIf_4_6.ngDoCheck(this, this._anchor_4, throwOnChange);
        this._vc_4.detectChangesInNestedViews(throwOnChange);
        valUnwrapper.reset();
        var currVal_9 = import3.inlineInterpolate(1, '', valUnwrapper.unwrap(this._pipe_translate_0.transform('HOME.TITLE')), '');
        if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange, this._expr_9, currVal_9))) {
            this.renderer.setText(this._text_2, currVal_9);
            this._expr_9 = currVal_9;
        }
    };
    View_HomePageComponent0.prototype.destroyInternal = function () {
        this._vc_4.destroyNestedViews();
        this._pipe_translate_0.ngOnDestroy();
    };
    View_HomePageComponent0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 4)) {
            return new View_HomePageComponent1(this.viewUtils, this, 4, this._anchor_4, this._vc_4);
        }
        return null;
    };
    return View_HomePageComponent0;
}(import1.AppView));
export { View_HomePageComponent0 };
//# sourceMappingURL=home-page.component.ngfactory.js.map