import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../app/app.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/router/src/router_module';
import * as import6 from '@angular/http/src/http_module';
import * as import7 from '@ngx-translate/core/index';
import * as import8 from '@angular/common/src/localization';
import * as import9 from '@angular/core/src/application_init';
import * as import10 from '@angular/core/src/testability/testability';
import * as import11 from '@angular/core/src/application_ref';
import * as import12 from '@angular/core/src/linker/compiler';
import * as import13 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import14 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import15 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import16 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import17 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import18 from '@angular/core/src/animation/animation_queue';
import * as import19 from '@angular/core/src/linker/view_utils';
import * as import20 from '@angular/platform-browser/src/browser/title';
import * as import21 from '@angular/http/src/backends/browser_xhr';
import * as import22 from '@angular/http/src/base_response_options';
import * as import23 from '@angular/http/src/backends/xhr_backend';
import * as import24 from '@angular/http/src/base_request_options';
import * as import25 from '@angular/common/src/location/location';
import * as import26 from '@angular/router/src/url_tree';
import * as import27 from '@angular/router/src/router_outlet_map';
import * as import28 from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as import29 from '@angular/router/src/router_preloader';
import * as import30 from '@ngx-translate/core/src/translate.parser';
import * as import31 from '@ngx-translate/core/src/missing-translation-handler';
import * as import32 from '@ngx-translate/core/src/translate.store';
import * as import33 from '@ngx-translate/core/src/translate.service';
import * as import34 from '@angular/core/src/di/injector';
import * as import35 from './login/login-page.component.ngfactory';
import * as import36 from './home/home-page.component.ngfactory';
import * as import37 from './main-app.component.ngfactory';
import * as import38 from '@angular/core/src/i18n/tokens';
import * as import39 from '@angular/core/src/application_tokens';
import * as import40 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import41 from '@angular/platform-browser/src/dom/events/key_events';
import * as import42 from '@angular/core/src/zone/ng_zone';
import * as import43 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import44 from '@angular/common/src/location/platform_location';
import * as import45 from '@angular/common/src/location/location_strategy';
import * as import46 from '../../app/login/login-page.component';
import * as import47 from '../../app/home/home-page.component';
import * as import48 from '@angular/router/src/url_handling_strategy';
import * as import49 from '@angular/router/src/route_reuse_strategy';
import * as import50 from '@angular/router/src/router';
import * as import51 from '@angular/core/src/console';
import * as import52 from '@angular/core/src/error_handler';
import * as import53 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import54 from '@angular/platform-browser/src/dom/animation_driver';
import * as import55 from '@angular/core/src/render/api';
import * as import56 from '@angular/core/src/security';
import * as import57 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import58 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import59 from '@angular/http/src/interfaces';
import * as import60 from '@angular/http/src/http';
import * as import61 from '@angular/core/src/linker/ng_module_factory_loader';
import * as import62 from '@angular/router/src/router_config_loader';
import * as import63 from '@angular/router/src/router_state';
import * as import64 from '@ngx-translate/core/src/translate.loader';
class AppModuleInjector extends import0.NgModuleInjector<import1.AppModule> {
  _CommonModule_0:import2.CommonModule;
  _ApplicationModule_1:import3.ApplicationModule;
  _BrowserModule_2:import4.BrowserModule;
  _ROUTER_FORROOT_GUARD_3:any;
  _RouterModule_4:import5.RouterModule;
  _HttpModule_5:import6.HttpModule;
  _TranslateModule_6:import7.TranslateModule;
  _AppModule_7:import1.AppModule;
  __LOCALE_ID_8:any;
  __NgLocalization_9:import8.NgLocaleLocalization;
  _ErrorHandler_10:any;
  _ApplicationInitStatus_11:import9.ApplicationInitStatus;
  _Testability_12:import10.Testability;
  _ApplicationRef__13:import11.ApplicationRef_;
  __ApplicationRef_14:any;
  __Compiler_15:import12.Compiler;
  __APP_ID_16:any;
  __DOCUMENT_17:any;
  __HAMMER_GESTURE_CONFIG_18:import13.HammerGestureConfig;
  __EVENT_MANAGER_PLUGINS_19:any[];
  __EventManager_20:import14.EventManager;
  _DomSharedStylesHost_21:import15.DomSharedStylesHost;
  __AnimationDriver_22:any;
  __DomRootRenderer_23:import16.DomRootRenderer_;
  __NgProbeToken_24:any[];
  __RootRenderer_25:any;
  __DomSanitizer_26:import17.DomSanitizerImpl;
  __Sanitizer_27:any;
  __AnimationQueue_28:import18.AnimationQueue;
  __ViewUtils_29:import19.ViewUtils;
  __IterableDiffers_30:any;
  __KeyValueDiffers_31:any;
  __SharedStylesHost_32:any;
  __Title_33:import20.Title;
  __BrowserXhr_34:import21.BrowserXhr;
  __ResponseOptions_35:import22.BaseResponseOptions;
  __XSRFStrategy_36:any;
  __XHRBackend_37:import23.XHRBackend;
  __RequestOptions_38:import24.BaseRequestOptions;
  __Http_39:any;
  __ROUTER_CONFIGURATION_40:any;
  __LocationStrategy_41:any;
  __Location_42:import25.Location;
  __UrlSerializer_43:import26.DefaultUrlSerializer;
  __RouterOutletMap_44:import27.RouterOutletMap;
  __NgModuleFactoryLoader_45:import28.SystemJsNgModuleLoader;
  __ROUTES_46:any[];
  __Router_47:any;
  __ActivatedRoute_48:any;
  _NoPreloading_49:import29.NoPreloading;
  _PreloadingStrategy_50:any;
  _RouterPreloader_51:import29.RouterPreloader;
  __PreloadAllModules_52:import29.PreloadAllModules;
  __ROUTER_INITIALIZER_53:any;
  __APP_BOOTSTRAP_LISTENER_54:any[];
  __TranslateLoader_55:any;
  __TranslateParser_56:import30.TranslateDefaultParser;
  __MissingTranslationHandler_57:import31.FakeMissingTranslationHandler;
  __TranslateStore_58:import32.TranslateStore;
  __USE_STORE_59:any;
  __TranslateService_60:import33.TranslateService;
  constructor(parent:import34.Injector) {
    super(parent,[
      import35.LoginPageComponentNgFactory,
      import36.HomePageComponentNgFactory,
      import37.MainAppComponentNgFactory
    ]
    ,[import37.MainAppComponentNgFactory]);
  }
  get _LOCALE_ID_8():any {
    if ((this.__LOCALE_ID_8 == null)) { (this.__LOCALE_ID_8 = import3._localeFactory(this.parent.get(import38.LOCALE_ID,(null as any)))); }
    return this.__LOCALE_ID_8;
  }
  get _NgLocalization_9():import8.NgLocaleLocalization {
    if ((this.__NgLocalization_9 == null)) { (this.__NgLocalization_9 = new import8.NgLocaleLocalization(this._LOCALE_ID_8)); }
    return this.__NgLocalization_9;
  }
  get _ApplicationRef_14():any {
    if ((this.__ApplicationRef_14 == null)) { (this.__ApplicationRef_14 = this._ApplicationRef__13); }
    return this.__ApplicationRef_14;
  }
  get _Compiler_15():import12.Compiler {
    if ((this.__Compiler_15 == null)) { (this.__Compiler_15 = new import12.Compiler()); }
    return this.__Compiler_15;
  }
  get _APP_ID_16():any {
    if ((this.__APP_ID_16 == null)) { (this.__APP_ID_16 = import39._appIdRandomProviderFactory()); }
    return this.__APP_ID_16;
  }
  get _DOCUMENT_17():any {
    if ((this.__DOCUMENT_17 == null)) { (this.__DOCUMENT_17 = import4._document()); }
    return this.__DOCUMENT_17;
  }
  get _HAMMER_GESTURE_CONFIG_18():import13.HammerGestureConfig {
    if ((this.__HAMMER_GESTURE_CONFIG_18 == null)) { (this.__HAMMER_GESTURE_CONFIG_18 = new import13.HammerGestureConfig()); }
    return this.__HAMMER_GESTURE_CONFIG_18;
  }
  get _EVENT_MANAGER_PLUGINS_19():any[] {
    if ((this.__EVENT_MANAGER_PLUGINS_19 == null)) { (this.__EVENT_MANAGER_PLUGINS_19 = [
      new import40.DomEventsPlugin(),
      new import41.KeyEventsPlugin(),
      new import13.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_18)
    ]
    ); }
    return this.__EVENT_MANAGER_PLUGINS_19;
  }
  get _EventManager_20():import14.EventManager {
    if ((this.__EventManager_20 == null)) { (this.__EventManager_20 = new import14.EventManager(this._EVENT_MANAGER_PLUGINS_19,this.parent.get(import42.NgZone))); }
    return this.__EventManager_20;
  }
  get _AnimationDriver_22():any {
    if ((this.__AnimationDriver_22 == null)) { (this.__AnimationDriver_22 = import4._resolveDefaultAnimationDriver()); }
    return this.__AnimationDriver_22;
  }
  get _DomRootRenderer_23():import16.DomRootRenderer_ {
    if ((this.__DomRootRenderer_23 == null)) { (this.__DomRootRenderer_23 = new import16.DomRootRenderer_(this._DOCUMENT_17,this._EventManager_20,this._DomSharedStylesHost_21,this._AnimationDriver_22,this._APP_ID_16)); }
    return this.__DomRootRenderer_23;
  }
  get _NgProbeToken_24():any[] {
    if ((this.__NgProbeToken_24 == null)) { (this.__NgProbeToken_24 = [import5.routerNgProbeToken()]); }
    return this.__NgProbeToken_24;
  }
  get _RootRenderer_25():any {
    if ((this.__RootRenderer_25 == null)) { (this.__RootRenderer_25 = import43._createConditionalRootRenderer(this._DomRootRenderer_23,this.parent.get(import43.NgProbeToken,(null as any)),this._NgProbeToken_24)); }
    return this.__RootRenderer_25;
  }
  get _DomSanitizer_26():import17.DomSanitizerImpl {
    if ((this.__DomSanitizer_26 == null)) { (this.__DomSanitizer_26 = new import17.DomSanitizerImpl()); }
    return this.__DomSanitizer_26;
  }
  get _Sanitizer_27():any {
    if ((this.__Sanitizer_27 == null)) { (this.__Sanitizer_27 = this._DomSanitizer_26); }
    return this.__Sanitizer_27;
  }
  get _AnimationQueue_28():import18.AnimationQueue {
    if ((this.__AnimationQueue_28 == null)) { (this.__AnimationQueue_28 = new import18.AnimationQueue(this.parent.get(import42.NgZone))); }
    return this.__AnimationQueue_28;
  }
  get _ViewUtils_29():import19.ViewUtils {
    if ((this.__ViewUtils_29 == null)) { (this.__ViewUtils_29 = new import19.ViewUtils(this._RootRenderer_25,this._Sanitizer_27,this._AnimationQueue_28)); }
    return this.__ViewUtils_29;
  }
  get _IterableDiffers_30():any {
    if ((this.__IterableDiffers_30 == null)) { (this.__IterableDiffers_30 = import3._iterableDiffersFactory()); }
    return this.__IterableDiffers_30;
  }
  get _KeyValueDiffers_31():any {
    if ((this.__KeyValueDiffers_31 == null)) { (this.__KeyValueDiffers_31 = import3._keyValueDiffersFactory()); }
    return this.__KeyValueDiffers_31;
  }
  get _SharedStylesHost_32():any {
    if ((this.__SharedStylesHost_32 == null)) { (this.__SharedStylesHost_32 = this._DomSharedStylesHost_21); }
    return this.__SharedStylesHost_32;
  }
  get _Title_33():import20.Title {
    if ((this.__Title_33 == null)) { (this.__Title_33 = new import20.Title()); }
    return this.__Title_33;
  }
  get _BrowserXhr_34():import21.BrowserXhr {
    if ((this.__BrowserXhr_34 == null)) { (this.__BrowserXhr_34 = new import21.BrowserXhr()); }
    return this.__BrowserXhr_34;
  }
  get _ResponseOptions_35():import22.BaseResponseOptions {
    if ((this.__ResponseOptions_35 == null)) { (this.__ResponseOptions_35 = new import22.BaseResponseOptions()); }
    return this.__ResponseOptions_35;
  }
  get _XSRFStrategy_36():any {
    if ((this.__XSRFStrategy_36 == null)) { (this.__XSRFStrategy_36 = import6._createDefaultCookieXSRFStrategy()); }
    return this.__XSRFStrategy_36;
  }
  get _XHRBackend_37():import23.XHRBackend {
    if ((this.__XHRBackend_37 == null)) { (this.__XHRBackend_37 = new import23.XHRBackend(this._BrowserXhr_34,this._ResponseOptions_35,this._XSRFStrategy_36)); }
    return this.__XHRBackend_37;
  }
  get _RequestOptions_38():import24.BaseRequestOptions {
    if ((this.__RequestOptions_38 == null)) { (this.__RequestOptions_38 = new import24.BaseRequestOptions()); }
    return this.__RequestOptions_38;
  }
  get _Http_39():any {
    if ((this.__Http_39 == null)) { (this.__Http_39 = import6.httpFactory(this._XHRBackend_37,this._RequestOptions_38)); }
    return this.__Http_39;
  }
  get _ROUTER_CONFIGURATION_40():any {
    if ((this.__ROUTER_CONFIGURATION_40 == null)) { (this.__ROUTER_CONFIGURATION_40 = {}); }
    return this.__ROUTER_CONFIGURATION_40;
  }
  get _LocationStrategy_41():any {
    if ((this.__LocationStrategy_41 == null)) { (this.__LocationStrategy_41 = import5.provideLocationStrategy(this.parent.get(import44.PlatformLocation),this.parent.get(import45.APP_BASE_HREF,(null as any)),this._ROUTER_CONFIGURATION_40)); }
    return this.__LocationStrategy_41;
  }
  get _Location_42():import25.Location {
    if ((this.__Location_42 == null)) { (this.__Location_42 = new import25.Location(this._LocationStrategy_41)); }
    return this.__Location_42;
  }
  get _UrlSerializer_43():import26.DefaultUrlSerializer {
    if ((this.__UrlSerializer_43 == null)) { (this.__UrlSerializer_43 = new import26.DefaultUrlSerializer()); }
    return this.__UrlSerializer_43;
  }
  get _RouterOutletMap_44():import27.RouterOutletMap {
    if ((this.__RouterOutletMap_44 == null)) { (this.__RouterOutletMap_44 = new import27.RouterOutletMap()); }
    return this.__RouterOutletMap_44;
  }
  get _NgModuleFactoryLoader_45():import28.SystemJsNgModuleLoader {
    if ((this.__NgModuleFactoryLoader_45 == null)) { (this.__NgModuleFactoryLoader_45 = new import28.SystemJsNgModuleLoader(this._Compiler_15,this.parent.get(import28.SystemJsNgModuleLoaderConfig,(null as any)))); }
    return this.__NgModuleFactoryLoader_45;
  }
  get _ROUTES_46():any[] {
      if ((this.__ROUTES_46 == null)) { (this.__ROUTES_46 = [[
        {
          path: 'login',
          component: import46.LoginPageComponent
        }
        ,
        {
          path: '',
          component: import47.HomePageComponent
        }

      ]
    ]); }
    return this.__ROUTES_46;
  }
  get _Router_47():any {
    if ((this.__Router_47 == null)) { (this.__Router_47 = import5.setupRouter(this._ApplicationRef_14,this._UrlSerializer_43,this._RouterOutletMap_44,this._Location_42,this,this._NgModuleFactoryLoader_45,this._Compiler_15,this._ROUTES_46,this._ROUTER_CONFIGURATION_40,this.parent.get(import48.UrlHandlingStrategy,(null as any)),this.parent.get(import49.RouteReuseStrategy,(null as any)))); }
    return this.__Router_47;
  }
  get _ActivatedRoute_48():any {
    if ((this.__ActivatedRoute_48 == null)) { (this.__ActivatedRoute_48 = import5.rootRoute(this._Router_47)); }
    return this.__ActivatedRoute_48;
  }
  get _PreloadAllModules_52():import29.PreloadAllModules {
    if ((this.__PreloadAllModules_52 == null)) { (this.__PreloadAllModules_52 = new import29.PreloadAllModules()); }
    return this.__PreloadAllModules_52;
  }
  get _ROUTER_INITIALIZER_53():any {
    if ((this.__ROUTER_INITIALIZER_53 == null)) { (this.__ROUTER_INITIALIZER_53 = import5.initialRouterNavigation(this._Router_47,this._ApplicationRef_14,this._RouterPreloader_51,this._ROUTER_CONFIGURATION_40)); }
    return this.__ROUTER_INITIALIZER_53;
  }
  get _APP_BOOTSTRAP_LISTENER_54():any[] {
    if ((this.__APP_BOOTSTRAP_LISTENER_54 == null)) { (this.__APP_BOOTSTRAP_LISTENER_54 = [this._ROUTER_INITIALIZER_53]); }
    return this.__APP_BOOTSTRAP_LISTENER_54;
  }
  get _TranslateLoader_55():any {
    if ((this.__TranslateLoader_55 == null)) { (this.__TranslateLoader_55 = import1.createTranslateLoader(this._Http_39)); }
    return this.__TranslateLoader_55;
  }
  get _TranslateParser_56():import30.TranslateDefaultParser {
    if ((this.__TranslateParser_56 == null)) { (this.__TranslateParser_56 = new import30.TranslateDefaultParser()); }
    return this.__TranslateParser_56;
  }
  get _MissingTranslationHandler_57():import31.FakeMissingTranslationHandler {
    if ((this.__MissingTranslationHandler_57 == null)) { (this.__MissingTranslationHandler_57 = new import31.FakeMissingTranslationHandler()); }
    return this.__MissingTranslationHandler_57;
  }
  get _TranslateStore_58():import32.TranslateStore {
    if ((this.__TranslateStore_58 == null)) { (this.__TranslateStore_58 = new import32.TranslateStore()); }
    return this.__TranslateStore_58;
  }
  get _USE_STORE_59():any {
    if ((this.__USE_STORE_59 == null)) { (this.__USE_STORE_59 = (undefined as any)); }
    return this.__USE_STORE_59;
  }
  get _TranslateService_60():import33.TranslateService {
    if ((this.__TranslateService_60 == null)) { (this.__TranslateService_60 = new import33.TranslateService(this._TranslateStore_58,this._TranslateLoader_55,this._TranslateParser_56,this._MissingTranslationHandler_57,this._USE_STORE_59)); }
    return this.__TranslateService_60;
  }
  createInternal():import1.AppModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._ApplicationModule_1 = new import3.ApplicationModule();
    this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule,(null as any)));
    this._ROUTER_FORROOT_GUARD_3 = import5.provideForRootGuard(this.parent.get(import50.Router,(null as any)));
    this._RouterModule_4 = new import5.RouterModule(this._ROUTER_FORROOT_GUARD_3);
    this._HttpModule_5 = new import6.HttpModule();
    this._TranslateModule_6 = new import7.TranslateModule();
    this._AppModule_7 = new import1.AppModule();
    this._ErrorHandler_10 = import4.errorHandler();
    this._ApplicationInitStatus_11 = new import9.ApplicationInitStatus(this.parent.get(import9.APP_INITIALIZER,(null as any)));
    this._Testability_12 = new import10.Testability(this.parent.get(import42.NgZone));
    this._ApplicationRef__13 = new import11.ApplicationRef_(this.parent.get(import42.NgZone),this.parent.get(import51.Console),this,this._ErrorHandler_10,this,this._ApplicationInitStatus_11,this.parent.get(import10.TestabilityRegistry,(null as any)),this._Testability_12);
    this._DomSharedStylesHost_21 = new import15.DomSharedStylesHost(this._DOCUMENT_17);
    this._NoPreloading_49 = new import29.NoPreloading();
    this._PreloadingStrategy_50 = this._NoPreloading_49;
    this._RouterPreloader_51 = new import29.RouterPreloader(this._Router_47,this._NgModuleFactoryLoader_45,this._Compiler_15,this,this._PreloadingStrategy_50);
    return this._AppModule_7;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import3.ApplicationModule)) { return this._ApplicationModule_1; }
    if ((token === import4.BrowserModule)) { return this._BrowserModule_2; }
    if ((token === import5.ROUTER_FORROOT_GUARD)) { return this._ROUTER_FORROOT_GUARD_3; }
    if ((token === import5.RouterModule)) { return this._RouterModule_4; }
    if ((token === import6.HttpModule)) { return this._HttpModule_5; }
    if ((token === import7.TranslateModule)) { return this._TranslateModule_6; }
    if ((token === import1.AppModule)) { return this._AppModule_7; }
    if ((token === import38.LOCALE_ID)) { return this._LOCALE_ID_8; }
    if ((token === import8.NgLocalization)) { return this._NgLocalization_9; }
    if ((token === import52.ErrorHandler)) { return this._ErrorHandler_10; }
    if ((token === import9.ApplicationInitStatus)) { return this._ApplicationInitStatus_11; }
    if ((token === import10.Testability)) { return this._Testability_12; }
    if ((token === import11.ApplicationRef_)) { return this._ApplicationRef__13; }
    if ((token === import11.ApplicationRef)) { return this._ApplicationRef_14; }
    if ((token === import12.Compiler)) { return this._Compiler_15; }
    if ((token === import39.APP_ID)) { return this._APP_ID_16; }
    if ((token === import53.DOCUMENT)) { return this._DOCUMENT_17; }
    if ((token === import13.HAMMER_GESTURE_CONFIG)) { return this._HAMMER_GESTURE_CONFIG_18; }
    if ((token === import14.EVENT_MANAGER_PLUGINS)) { return this._EVENT_MANAGER_PLUGINS_19; }
    if ((token === import14.EventManager)) { return this._EventManager_20; }
    if ((token === import15.DomSharedStylesHost)) { return this._DomSharedStylesHost_21; }
    if ((token === import54.AnimationDriver)) { return this._AnimationDriver_22; }
    if ((token === import16.DomRootRenderer)) { return this._DomRootRenderer_23; }
    if ((token === import11.NgProbeToken)) { return this._NgProbeToken_24; }
    if ((token === import55.RootRenderer)) { return this._RootRenderer_25; }
    if ((token === import17.DomSanitizer)) { return this._DomSanitizer_26; }
    if ((token === import56.Sanitizer)) { return this._Sanitizer_27; }
    if ((token === import18.AnimationQueue)) { return this._AnimationQueue_28; }
    if ((token === import19.ViewUtils)) { return this._ViewUtils_29; }
    if ((token === import57.IterableDiffers)) { return this._IterableDiffers_30; }
    if ((token === import58.KeyValueDiffers)) { return this._KeyValueDiffers_31; }
    if ((token === import15.SharedStylesHost)) { return this._SharedStylesHost_32; }
    if ((token === import20.Title)) { return this._Title_33; }
    if ((token === import21.BrowserXhr)) { return this._BrowserXhr_34; }
    if ((token === import22.ResponseOptions)) { return this._ResponseOptions_35; }
    if ((token === import59.XSRFStrategy)) { return this._XSRFStrategy_36; }
    if ((token === import23.XHRBackend)) { return this._XHRBackend_37; }
    if ((token === import24.RequestOptions)) { return this._RequestOptions_38; }
    if ((token === import60.Http)) { return this._Http_39; }
    if ((token === import5.ROUTER_CONFIGURATION)) { return this._ROUTER_CONFIGURATION_40; }
    if ((token === import45.LocationStrategy)) { return this._LocationStrategy_41; }
    if ((token === import25.Location)) { return this._Location_42; }
    if ((token === import26.UrlSerializer)) { return this._UrlSerializer_43; }
    if ((token === import27.RouterOutletMap)) { return this._RouterOutletMap_44; }
    if ((token === import61.NgModuleFactoryLoader)) { return this._NgModuleFactoryLoader_45; }
    if ((token === import62.ROUTES)) { return this._ROUTES_46; }
    if ((token === import50.Router)) { return this._Router_47; }
    if ((token === import63.ActivatedRoute)) { return this._ActivatedRoute_48; }
    if ((token === import29.NoPreloading)) { return this._NoPreloading_49; }
    if ((token === import29.PreloadingStrategy)) { return this._PreloadingStrategy_50; }
    if ((token === import29.RouterPreloader)) { return this._RouterPreloader_51; }
    if ((token === import29.PreloadAllModules)) { return this._PreloadAllModules_52; }
    if ((token === import5.ROUTER_INITIALIZER)) { return this._ROUTER_INITIALIZER_53; }
    if ((token === import39.APP_BOOTSTRAP_LISTENER)) { return this._APP_BOOTSTRAP_LISTENER_54; }
    if ((token === import64.TranslateLoader)) { return this._TranslateLoader_55; }
    if ((token === import30.TranslateParser)) { return this._TranslateParser_56; }
    if ((token === import31.MissingTranslationHandler)) { return this._MissingTranslationHandler_57; }
    if ((token === import32.TranslateStore)) { return this._TranslateStore_58; }
    if ((token === import33.USE_STORE)) { return this._USE_STORE_59; }
    if ((token === import33.TranslateService)) { return this._TranslateService_60; }
    return notFoundResult;
  }
  destroyInternal():void {
    this._ApplicationRef__13.ngOnDestroy();
    this._DomSharedStylesHost_21.ngOnDestroy();
    this._RouterPreloader_51.ngOnDestroy();
  }
}
export const AppModuleNgFactory:import0.NgModuleFactory<import1.AppModule> = new import0.NgModuleFactory(AppModuleInjector,import1.AppModule);