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
import * as import0 from '../../app/main-app.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/core/src/change_detection/change_detection_util';
var Wrapper_MainAppComponent = (function () {
    function Wrapper_MainAppComponent() {
        this._changed = false;
        this.context = new import0.MainAppComponent();
    }
    Wrapper_MainAppComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_MainAppComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_MainAppComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_MainAppComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_MainAppComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_MainAppComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_MainAppComponent;
}());
export { Wrapper_MainAppComponent };
var renderType_MainAppComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_MainAppComponent_Host0 = (function (_super) {
    __extends(View_MainAppComponent_Host0, _super);
    function View_MainAppComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_MainAppComponent_Host0, renderType_MainAppComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_MainAppComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'main-app', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_MainAppComponent0(this.viewUtils, this, 0, this._el_0);
        this._MainAppComponent_0_3 = new Wrapper_MainAppComponent();
        this.compView_0.create(this._MainAppComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._MainAppComponent_0_3.context);
    };
    View_MainAppComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.MainAppComponent) && (0 === requestNodeIndex))) {
            return this._MainAppComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_MainAppComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._MainAppComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_MainAppComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_MainAppComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_MainAppComponent_Host0;
}(import1.AppView));
export var MainAppComponentNgFactory = new import7.ComponentFactory('main-app', View_MainAppComponent_Host0, import0.MainAppComponent);
var styles_MainAppComponent = [];
var renderType_MainAppComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_MainAppComponent, {});
var View_MainAppComponent0 = (function (_super) {
    __extends(View_MainAppComponent0, _super);
    function View_MainAppComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_MainAppComponent0, renderType_MainAppComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_4 = import8.UNINITIALIZED;
        return _this;
    }
    View_MainAppComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = import3.createRenderElement(this.renderer, parentRenderNode, 'h2', import3.EMPTY_INLINE_ARRAY, null);
        this._text_1 = this.renderer.createText(this._el_0, 'Hello World From Angular 2', null);
        this._el_2 = import3.createRenderElement(this.renderer, parentRenderNode, 'div', import3.EMPTY_INLINE_ARRAY, null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3
        ]), null);
        return null;
    };
    View_MainAppComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_4 = import3.inlineInterpolate(1, '', this.context.testVariable, '');
        if (import3.checkBinding(throwOnChange, this._expr_4, currVal_4)) {
            this.renderer.setText(this._text_3, currVal_4);
            this._expr_4 = currVal_4;
        }
    };
    return View_MainAppComponent0;
}(import1.AppView));
export { View_MainAppComponent0 };
//# sourceMappingURL=main-app.component.ngfactory.js.map