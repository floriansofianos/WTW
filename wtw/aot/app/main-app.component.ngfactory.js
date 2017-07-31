var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var import0 = require('../../app/main-app.component');
var import1 = require('@angular/core/src/linker/view');
var import3 = require('@angular/core/src/linker/view_utils');
var import4 = require('@angular/core/src/metadata/view');
var import5 = require('@angular/core/src/linker/view_type');
var import6 = require('@angular/core/src/change_detection/constants');
var import7 = require('@angular/core/src/linker/component_factory');
var import8 = require('@ngx-translate/core/src/translate.service');
var import9 = require('@angular/core/src/linker/view_container');
var import10 = require('../node_modules/@angular/router/src/directives/router_outlet.ngfactory');
var import11 = require('@angular/router/src/router_outlet_map');
var import12 = require('@angular/core/src/linker/component_factory_resolver');
var import13 = require('@angular/router/src/directives/router_outlet');
var Wrapper_MainAppComponent = (function () {
    function Wrapper_MainAppComponent(p0) {
        this._changed = false;
        this.context = new import0.MainAppComponent(p0);
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
})();
exports.Wrapper_MainAppComponent = Wrapper_MainAppComponent;
var renderType_MainAppComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_MainAppComponent_Host0 = (function (_super) {
    __extends(View_MainAppComponent_Host0, _super);
    function View_MainAppComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_MainAppComponent_Host0, renderType_MainAppComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways);
    }
    View_MainAppComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'main-app', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_MainAppComponent0(this.viewUtils, this, 0, this._el_0);
        this._MainAppComponent_0_3 = new Wrapper_MainAppComponent(this.injectorGet(import8.TranslateService, this.parentIndex));
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
})(import1.AppView);
exports.MainAppComponentNgFactory = new import7.ComponentFactory('main-app', View_MainAppComponent_Host0, import0.MainAppComponent);
var styles_MainAppComponent = [];
var renderType_MainAppComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_MainAppComponent, {});
var View_MainAppComponent0 = (function (_super) {
    __extends(View_MainAppComponent0, _super);
    function View_MainAppComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_MainAppComponent0, renderType_MainAppComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways);
    }
    View_MainAppComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_1 = import3.createRenderElement(this.renderer, parentRenderNode, 'router-outlet', import3.EMPTY_INLINE_ARRAY, null);
        this._vc_1 = new import9.ViewContainer(1, null, this, this._el_1);
        this._RouterOutlet_1_5 = new import10.Wrapper_RouterOutlet(this.parentView.injectorGet(import11.RouterOutletMap, this.parentIndex), this._vc_1.vcRef, this.parentView.injectorGet(import12.ComponentFactoryResolver, this.parentIndex), null);
        this._text_2 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._text_0,
            this._el_1,
            this._text_2
        ]), null);
        return null;
    };
    View_MainAppComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import13.RouterOutlet) && (1 === requestNodeIndex))) {
            return this._RouterOutlet_1_5.context;
        }
        return notFoundResult;
    };
    View_MainAppComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        this._RouterOutlet_1_5.ngDoCheck(this, this._el_1, throwOnChange);
        this._vc_1.detectChangesInNestedViews(throwOnChange);
    };
    View_MainAppComponent0.prototype.destroyInternal = function () {
        this._vc_1.destroyNestedViews();
        this._RouterOutlet_1_5.ngOnDestroy();
    };
    return View_MainAppComponent0;
})(import1.AppView);
exports.View_MainAppComponent0 = View_MainAppComponent0;
//# sourceMappingURL=main-app.component.ngfactory.js.map