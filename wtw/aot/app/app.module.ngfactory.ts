import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../app/app.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/http/http';
import * as import6 from '@ngx-translate/core/index';
import * as import7 from '@angular/common/src/localization';
import * as import8 from '@angular/core/src/application_init';
import * as import9 from '@angular/core/src/testability/testability';
import * as import10 from '@angular/core/src/application_ref';
import * as import11 from '@angular/core/src/linker/compiler';
import * as import12 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import13 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import14 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import15 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import16 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import17 from '@angular/core/src/animation/animation_queue';
import * as import18 from '@angular/core/src/linker/view_utils';
import * as import19 from '@angular/platform-browser/src/browser/title';
import * as import20 from '@ngx-translate/core/src/translate.parser';
import * as import21 from '@ngx-translate/core/src/missing-translation-handler';
import * as import22 from '@ngx-translate/core/src/translate.store';
import * as import23 from '@ngx-translate/core/src/translate.service';
import * as import24 from '@angular/core/src/di/injector';
import * as import25 from './main-app.component.ngfactory';
import * as import26 from '@angular/core/src/i18n/tokens';
import * as import27 from '@angular/core/src/application_tokens';
import * as import28 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import29 from '@angular/platform-browser/src/dom/events/key_events';
import * as import30 from '@angular/core/src/zone/ng_zone';
import * as import31 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import32 from '@angular/core/src/console';
import * as import33 from '@angular/core/src/error_handler';
import * as import34 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import35 from '@angular/platform-browser/src/dom/animation_driver';
import * as import36 from '@angular/core/src/render/api';
import * as import37 from '@angular/core/src/security';
import * as import38 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import39 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import40 from '@ngx-translate/core/src/translate.loader';
class AppModuleInjector extends import0.NgModuleInjector<import1.AppModule> {
  _CommonModule_0:import2.CommonModule;
  _ApplicationModule_1:import3.ApplicationModule;
  _BrowserModule_2:import4.BrowserModule;
  _HttpModule_3:import5.HttpModule;
  _TranslateModule_4:import6.TranslateModule;
  _AppModule_5:import1.AppModule;
  __LOCALE_ID_6:any;
  __NgLocalization_7:import7.NgLocaleLocalization;
  _ErrorHandler_8:any;
  _ApplicationInitStatus_9:import8.ApplicationInitStatus;
  _Testability_10:import9.Testability;
  _ApplicationRef__11:import10.ApplicationRef_;
  __ApplicationRef_12:any;
  __Compiler_13:import11.Compiler;
  __APP_ID_14:any;
  __DOCUMENT_15:any;
  __HAMMER_GESTURE_CONFIG_16:import12.HammerGestureConfig;
  __EVENT_MANAGER_PLUGINS_17:any[];
  __EventManager_18:import13.EventManager;
  _DomSharedStylesHost_19:import14.DomSharedStylesHost;
  __AnimationDriver_20:any;
  __DomRootRenderer_21:import15.DomRootRenderer_;
  __RootRenderer_22:any;
  __DomSanitizer_23:import16.DomSanitizerImpl;
  __Sanitizer_24:any;
  __AnimationQueue_25:import17.AnimationQueue;
  __ViewUtils_26:import18.ViewUtils;
  __IterableDiffers_27:any;
  __KeyValueDiffers_28:any;
  __SharedStylesHost_29:any;
  __Title_30:import19.Title;
  __BrowserXhr_31:import5.BrowserXhr;
  __ResponseOptions_32:import5.BaseResponseOptions;
  __XSRFStrategy_33:any;
  __XHRBackend_34:import5.XHRBackend;
  __RequestOptions_35:import5.BaseRequestOptions;
  __Http_36:any;
  __TranslateLoader_37:any;
  __TranslateParser_38:import20.TranslateDefaultParser;
  __MissingTranslationHandler_39:import21.FakeMissingTranslationHandler;
  __TranslateStore_40:import22.TranslateStore;
  __USE_STORE_41:any;
  __TranslateService_42:import23.TranslateService;
  constructor(parent:import24.Injector) {
    super(parent,[import25.MainAppComponentNgFactory],[import25.MainAppComponentNgFactory]);
  }
  get _LOCALE_ID_6():any {
    if ((this.__LOCALE_ID_6 == null)) { (this.__LOCALE_ID_6 = import3._localeFactory(this.parent.get(import26.LOCALE_ID,(null as any)))); }
    return this.__LOCALE_ID_6;
  }
  get _NgLocalization_7():import7.NgLocaleLocalization {
    if ((this.__NgLocalization_7 == null)) { (this.__NgLocalization_7 = new import7.NgLocaleLocalization(this._LOCALE_ID_6)); }
    return this.__NgLocalization_7;
  }
  get _ApplicationRef_12():any {
    if ((this.__ApplicationRef_12 == null)) { (this.__ApplicationRef_12 = this._ApplicationRef__11); }
    return this.__ApplicationRef_12;
  }
  get _Compiler_13():import11.Compiler {
    if ((this.__Compiler_13 == null)) { (this.__Compiler_13 = new import11.Compiler()); }
    return this.__Compiler_13;
  }
  get _APP_ID_14():any {
    if ((this.__APP_ID_14 == null)) { (this.__APP_ID_14 = import27._appIdRandomProviderFactory()); }
    return this.__APP_ID_14;
  }
  get _DOCUMENT_15():any {
    if ((this.__DOCUMENT_15 == null)) { (this.__DOCUMENT_15 = import4._document()); }
    return this.__DOCUMENT_15;
  }
  get _HAMMER_GESTURE_CONFIG_16():import12.HammerGestureConfig {
    if ((this.__HAMMER_GESTURE_CONFIG_16 == null)) { (this.__HAMMER_GESTURE_CONFIG_16 = new import12.HammerGestureConfig()); }
    return this.__HAMMER_GESTURE_CONFIG_16;
  }
  get _EVENT_MANAGER_PLUGINS_17():any[] {
    if ((this.__EVENT_MANAGER_PLUGINS_17 == null)) { (this.__EVENT_MANAGER_PLUGINS_17 = [
      new import28.DomEventsPlugin(),
      new import29.KeyEventsPlugin(),
      new import12.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_16)
    ]
    ); }
    return this.__EVENT_MANAGER_PLUGINS_17;
  }
  get _EventManager_18():import13.EventManager {
    if ((this.__EventManager_18 == null)) { (this.__EventManager_18 = new import13.EventManager(this._EVENT_MANAGER_PLUGINS_17,this.parent.get(import30.NgZone))); }
    return this.__EventManager_18;
  }
  get _AnimationDriver_20():any {
    if ((this.__AnimationDriver_20 == null)) { (this.__AnimationDriver_20 = import4._resolveDefaultAnimationDriver()); }
    return this.__AnimationDriver_20;
  }
  get _DomRootRenderer_21():import15.DomRootRenderer_ {
    if ((this.__DomRootRenderer_21 == null)) { (this.__DomRootRenderer_21 = new import15.DomRootRenderer_(this._DOCUMENT_15,this._EventManager_18,this._DomSharedStylesHost_19,this._AnimationDriver_20,this._APP_ID_14)); }
    return this.__DomRootRenderer_21;
  }
  get _RootRenderer_22():any {
    if ((this.__RootRenderer_22 == null)) { (this.__RootRenderer_22 = import31._createConditionalRootRenderer(this._DomRootRenderer_21,this.parent.get(import31.NgProbeToken,(null as any)),this.parent.get(import10.NgProbeToken,(null as any)))); }
    return this.__RootRenderer_22;
  }
  get _DomSanitizer_23():import16.DomSanitizerImpl {
    if ((this.__DomSanitizer_23 == null)) { (this.__DomSanitizer_23 = new import16.DomSanitizerImpl()); }
    return this.__DomSanitizer_23;
  }
  get _Sanitizer_24():any {
    if ((this.__Sanitizer_24 == null)) { (this.__Sanitizer_24 = this._DomSanitizer_23); }
    return this.__Sanitizer_24;
  }
  get _AnimationQueue_25():import17.AnimationQueue {
    if ((this.__AnimationQueue_25 == null)) { (this.__AnimationQueue_25 = new import17.AnimationQueue(this.parent.get(import30.NgZone))); }
    return this.__AnimationQueue_25;
  }
  get _ViewUtils_26():import18.ViewUtils {
    if ((this.__ViewUtils_26 == null)) { (this.__ViewUtils_26 = new import18.ViewUtils(this._RootRenderer_22,this._Sanitizer_24,this._AnimationQueue_25)); }
    return this.__ViewUtils_26;
  }
  get _IterableDiffers_27():any {
    if ((this.__IterableDiffers_27 == null)) { (this.__IterableDiffers_27 = import3._iterableDiffersFactory()); }
    return this.__IterableDiffers_27;
  }
  get _KeyValueDiffers_28():any {
    if ((this.__KeyValueDiffers_28 == null)) { (this.__KeyValueDiffers_28 = import3._keyValueDiffersFactory()); }
    return this.__KeyValueDiffers_28;
  }
  get _SharedStylesHost_29():any {
    if ((this.__SharedStylesHost_29 == null)) { (this.__SharedStylesHost_29 = this._DomSharedStylesHost_19); }
    return this.__SharedStylesHost_29;
  }
  get _Title_30():import19.Title {
    if ((this.__Title_30 == null)) { (this.__Title_30 = new import19.Title()); }
    return this.__Title_30;
  }
  get _BrowserXhr_31():import5.BrowserXhr {
    if ((this.__BrowserXhr_31 == null)) { (this.__BrowserXhr_31 = new import5.BrowserXhr()); }
    return this.__BrowserXhr_31;
  }
  get _ResponseOptions_32():import5.BaseResponseOptions {
    if ((this.__ResponseOptions_32 == null)) { (this.__ResponseOptions_32 = new import5.BaseResponseOptions()); }
    return this.__ResponseOptions_32;
  }
  get _XSRFStrategy_33():any {
    if ((this.__XSRFStrategy_33 == null)) { (this.__XSRFStrategy_33 = import5.ɵb()); }
    return this.__XSRFStrategy_33;
  }
  get _XHRBackend_34():import5.XHRBackend {
    if ((this.__XHRBackend_34 == null)) { (this.__XHRBackend_34 = new import5.XHRBackend(this._BrowserXhr_31,this._ResponseOptions_32,this._XSRFStrategy_33)); }
    return this.__XHRBackend_34;
  }
  get _RequestOptions_35():import5.BaseRequestOptions {
    if ((this.__RequestOptions_35 == null)) { (this.__RequestOptions_35 = new import5.BaseRequestOptions()); }
    return this.__RequestOptions_35;
  }
  get _Http_36():any {
    if ((this.__Http_36 == null)) { (this.__Http_36 = import5.ɵc(this._XHRBackend_34,this._RequestOptions_35)); }
    return this.__Http_36;
  }
  get _TranslateLoader_37():any {
    if ((this.__TranslateLoader_37 == null)) { (this.__TranslateLoader_37 = import1.HttpLoaderFactory(this._Http_36)); }
    return this.__TranslateLoader_37;
  }
  get _TranslateParser_38():import20.TranslateDefaultParser {
    if ((this.__TranslateParser_38 == null)) { (this.__TranslateParser_38 = new import20.TranslateDefaultParser()); }
    return this.__TranslateParser_38;
  }
  get _MissingTranslationHandler_39():import21.FakeMissingTranslationHandler {
    if ((this.__MissingTranslationHandler_39 == null)) { (this.__MissingTranslationHandler_39 = new import21.FakeMissingTranslationHandler()); }
    return this.__MissingTranslationHandler_39;
  }
  get _TranslateStore_40():import22.TranslateStore {
    if ((this.__TranslateStore_40 == null)) { (this.__TranslateStore_40 = new import22.TranslateStore()); }
    return this.__TranslateStore_40;
  }
  get _USE_STORE_41():any {
    if ((this.__USE_STORE_41 == null)) { (this.__USE_STORE_41 = (undefined as any)); }
    return this.__USE_STORE_41;
  }
  get _TranslateService_42():import23.TranslateService {
    if ((this.__TranslateService_42 == null)) { (this.__TranslateService_42 = new import23.TranslateService(this._TranslateStore_40,this._TranslateLoader_37,this._TranslateParser_38,this._MissingTranslationHandler_39,this._USE_STORE_41)); }
    return this.__TranslateService_42;
  }
  createInternal():import1.AppModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._ApplicationModule_1 = new import3.ApplicationModule();
    this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule,(null as any)));
    this._HttpModule_3 = new import5.HttpModule();
    this._TranslateModule_4 = new import6.TranslateModule();
    this._AppModule_5 = new import1.AppModule();
    this._ErrorHandler_8 = import4.errorHandler();
    this._ApplicationInitStatus_9 = new import8.ApplicationInitStatus(this.parent.get(import8.APP_INITIALIZER,(null as any)));
    this._Testability_10 = new import9.Testability(this.parent.get(import30.NgZone));
    this._ApplicationRef__11 = new import10.ApplicationRef_(this.parent.get(import30.NgZone),this.parent.get(import32.Console),this,this._ErrorHandler_8,this,this._ApplicationInitStatus_9,this.parent.get(import9.TestabilityRegistry,(null as any)),this._Testability_10);
    this._DomSharedStylesHost_19 = new import14.DomSharedStylesHost(this._DOCUMENT_15);
    return this._AppModule_5;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import3.ApplicationModule)) { return this._ApplicationModule_1; }
    if ((token === import4.BrowserModule)) { return this._BrowserModule_2; }
    if ((token === import5.HttpModule)) { return this._HttpModule_3; }
    if ((token === import6.TranslateModule)) { return this._TranslateModule_4; }
    if ((token === import1.AppModule)) { return this._AppModule_5; }
    if ((token === import26.LOCALE_ID)) { return this._LOCALE_ID_6; }
    if ((token === import7.NgLocalization)) { return this._NgLocalization_7; }
    if ((token === import33.ErrorHandler)) { return this._ErrorHandler_8; }
    if ((token === import8.ApplicationInitStatus)) { return this._ApplicationInitStatus_9; }
    if ((token === import9.Testability)) { return this._Testability_10; }
    if ((token === import10.ApplicationRef_)) { return this._ApplicationRef__11; }
    if ((token === import10.ApplicationRef)) { return this._ApplicationRef_12; }
    if ((token === import11.Compiler)) { return this._Compiler_13; }
    if ((token === import27.APP_ID)) { return this._APP_ID_14; }
    if ((token === import34.DOCUMENT)) { return this._DOCUMENT_15; }
    if ((token === import12.HAMMER_GESTURE_CONFIG)) { return this._HAMMER_GESTURE_CONFIG_16; }
    if ((token === import13.EVENT_MANAGER_PLUGINS)) { return this._EVENT_MANAGER_PLUGINS_17; }
    if ((token === import13.EventManager)) { return this._EventManager_18; }
    if ((token === import14.DomSharedStylesHost)) { return this._DomSharedStylesHost_19; }
    if ((token === import35.AnimationDriver)) { return this._AnimationDriver_20; }
    if ((token === import15.DomRootRenderer)) { return this._DomRootRenderer_21; }
    if ((token === import36.RootRenderer)) { return this._RootRenderer_22; }
    if ((token === import16.DomSanitizer)) { return this._DomSanitizer_23; }
    if ((token === import37.Sanitizer)) { return this._Sanitizer_24; }
    if ((token === import17.AnimationQueue)) { return this._AnimationQueue_25; }
    if ((token === import18.ViewUtils)) { return this._ViewUtils_26; }
    if ((token === import38.IterableDiffers)) { return this._IterableDiffers_27; }
    if ((token === import39.KeyValueDiffers)) { return this._KeyValueDiffers_28; }
    if ((token === import14.SharedStylesHost)) { return this._SharedStylesHost_29; }
    if ((token === import19.Title)) { return this._Title_30; }
    if ((token === import5.BrowserXhr)) { return this._BrowserXhr_31; }
    if ((token === import5.ResponseOptions)) { return this._ResponseOptions_32; }
    if ((token === import5.XSRFStrategy)) { return this._XSRFStrategy_33; }
    if ((token === import5.XHRBackend)) { return this._XHRBackend_34; }
    if ((token === import5.RequestOptions)) { return this._RequestOptions_35; }
    if ((token === import5.Http)) { return this._Http_36; }
    if ((token === import40.TranslateLoader)) { return this._TranslateLoader_37; }
    if ((token === import20.TranslateParser)) { return this._TranslateParser_38; }
    if ((token === import21.MissingTranslationHandler)) { return this._MissingTranslationHandler_39; }
    if ((token === import22.TranslateStore)) { return this._TranslateStore_40; }
    if ((token === import23.USE_STORE)) { return this._USE_STORE_41; }
    if ((token === import23.TranslateService)) { return this._TranslateService_42; }
    return notFoundResult;
  }
  destroyInternal():void {
    this._ApplicationRef__11.ngOnDestroy();
    this._DomSharedStylesHost_19.ngOnDestroy();
  }
}
export const AppModuleNgFactory:import0.NgModuleFactory<import1.AppModule> = new import0.NgModuleFactory(AppModuleInjector,import1.AppModule);