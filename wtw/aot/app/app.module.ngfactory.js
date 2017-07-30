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
import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../app/app.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/forms/src/directives';
import * as import6 from '@angular/forms/src/form_providers';
import * as import7 from '@angular/router/src/router_module';
import * as import8 from '@angular/http/src/http_module';
import * as import9 from '@ngx-translate/core/index';
import * as import10 from '@angular/common/src/localization';
import * as import11 from '@angular/core/src/application_init';
import * as import12 from '@angular/core/src/testability/testability';
import * as import13 from '@angular/core/src/application_ref';
import * as import14 from '@angular/core/src/linker/compiler';
import * as import15 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import16 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import17 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import18 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import19 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import20 from '@angular/core/src/animation/animation_queue';
import * as import21 from '@angular/core/src/linker/view_utils';
import * as import22 from '@angular/platform-browser/src/browser/title';
import * as import23 from '@angular/forms/src/form_builder';
import * as import24 from '@angular/forms/src/directives/radio_control_value_accessor';
import * as import25 from '@angular/http/src/backends/browser_xhr';
import * as import26 from '@angular/http/src/base_response_options';
import * as import27 from '@angular/http/src/backends/xhr_backend';
import * as import28 from '@angular/http/src/base_request_options';
import * as import29 from '@angular/common/src/location/location';
import * as import30 from '@angular/router/src/url_tree';
import * as import31 from '@angular/router/src/router_outlet_map';
import * as import32 from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as import33 from '@angular/router/src/router_preloader';
import * as import34 from '@ngx-translate/core/src/translate.parser';
import * as import35 from '@ngx-translate/core/src/missing-translation-handler';
import * as import36 from '@ngx-translate/core/src/translate.store';
import * as import37 from '@ngx-translate/core/src/translate.service';
import * as import38 from '../../app/auth/auth.service';
import * as import40 from './login/login-page.component.ngfactory';
import * as import41 from './home/home-page.component.ngfactory';
import * as import42 from './main-app.component.ngfactory';
import * as import43 from '@angular/core/src/i18n/tokens';
import * as import44 from '@angular/core/src/application_tokens';
import * as import45 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import46 from '@angular/platform-browser/src/dom/events/key_events';
import * as import47 from '@angular/core/src/zone/ng_zone';
import * as import48 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import49 from '@angular/common/src/location/platform_location';
import * as import50 from '@angular/common/src/location/location_strategy';
import * as import51 from '../../app/login/login-page.component';
import * as import52 from '../../app/home/home-page.component';
import * as import53 from '@angular/router/src/url_handling_strategy';
import * as import54 from '@angular/router/src/route_reuse_strategy';
import * as import55 from '@angular/router/src/router';
import * as import56 from '@angular/core/src/console';
import * as import57 from '@angular/core/src/error_handler';
import * as import58 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import59 from '@angular/platform-browser/src/dom/animation_driver';
import * as import60 from '@angular/core/src/render/api';
import * as import61 from '@angular/core/src/security';
import * as import62 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import63 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import64 from '@angular/http/src/interfaces';
import * as import65 from '@angular/http/src/http';
import * as import66 from '@angular/core/src/linker/ng_module_factory_loader';
import * as import67 from '@angular/router/src/router_config_loader';
import * as import68 from '@angular/router/src/router_state';
import * as import69 from '@ngx-translate/core/src/translate.loader';
var AppModuleInjector = (function (_super) {
    __extends(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        return _super.call(this, parent, [
            import40.LoginPageComponentNgFactory,
            import41.HomePageComponentNgFactory,
            import42.MainAppComponentNgFactory
        ], [import42.MainAppComponentNgFactory]) || this;
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_10", {
        get: function () {
            if ((this.__LOCALE_ID_10 == null)) {
                (this.__LOCALE_ID_10 = import3._localeFactory(this.parent.get(import43.LOCALE_ID, null)));
            }
            return this.__LOCALE_ID_10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_11", {
        get: function () {
            if ((this.__NgLocalization_11 == null)) {
                (this.__NgLocalization_11 = new import10.NgLocaleLocalization(this._LOCALE_ID_10));
            }
            return this.__NgLocalization_11;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ApplicationRef_18", {
        get: function () {
            if ((this.__ApplicationRef_18 == null)) {
                (this.__ApplicationRef_18 = this._ApplicationRef__17);
            }
            return this.__ApplicationRef_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_19", {
        get: function () {
            if ((this.__Compiler_19 == null)) {
                (this.__Compiler_19 = new import14.Compiler());
            }
            return this.__Compiler_19;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_20", {
        get: function () {
            if ((this.__APP_ID_20 == null)) {
                (this.__APP_ID_20 = import44._appIdRandomProviderFactory());
            }
            return this.__APP_ID_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_21", {
        get: function () {
            if ((this.__DOCUMENT_21 == null)) {
                (this.__DOCUMENT_21 = import4._document());
            }
            return this.__DOCUMENT_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_22", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_22 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_22 = new import15.HammerGestureConfig());
            }
            return this.__HAMMER_GESTURE_CONFIG_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_23", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_23 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_23 = [
                    new import45.DomEventsPlugin(),
                    new import46.KeyEventsPlugin(),
                    new import15.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_22)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_24", {
        get: function () {
            if ((this.__EventManager_24 == null)) {
                (this.__EventManager_24 = new import16.EventManager(this._EVENT_MANAGER_PLUGINS_23, this.parent.get(import47.NgZone)));
            }
            return this.__EventManager_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_26", {
        get: function () {
            if ((this.__AnimationDriver_26 == null)) {
                (this.__AnimationDriver_26 = import4._resolveDefaultAnimationDriver());
            }
            return this.__AnimationDriver_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_27", {
        get: function () {
            if ((this.__DomRootRenderer_27 == null)) {
                (this.__DomRootRenderer_27 = new import18.DomRootRenderer_(this._DOCUMENT_21, this._EventManager_24, this._DomSharedStylesHost_25, this._AnimationDriver_26, this._APP_ID_20));
            }
            return this.__DomRootRenderer_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgProbeToken_28", {
        get: function () {
            if ((this.__NgProbeToken_28 == null)) {
                (this.__NgProbeToken_28 = [import7.routerNgProbeToken()]);
            }
            return this.__NgProbeToken_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_29", {
        get: function () {
            if ((this.__RootRenderer_29 == null)) {
                (this.__RootRenderer_29 = import48._createConditionalRootRenderer(this._DomRootRenderer_27, this.parent.get(import48.NgProbeToken, null), this._NgProbeToken_28));
            }
            return this.__RootRenderer_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_30", {
        get: function () {
            if ((this.__DomSanitizer_30 == null)) {
                (this.__DomSanitizer_30 = new import19.DomSanitizerImpl());
            }
            return this.__DomSanitizer_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_31", {
        get: function () {
            if ((this.__Sanitizer_31 == null)) {
                (this.__Sanitizer_31 = this._DomSanitizer_30);
            }
            return this.__Sanitizer_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationQueue_32", {
        get: function () {
            if ((this.__AnimationQueue_32 == null)) {
                (this.__AnimationQueue_32 = new import20.AnimationQueue(this.parent.get(import47.NgZone)));
            }
            return this.__AnimationQueue_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_33", {
        get: function () {
            if ((this.__ViewUtils_33 == null)) {
                (this.__ViewUtils_33 = new import21.ViewUtils(this._RootRenderer_29, this._Sanitizer_31, this._AnimationQueue_32));
            }
            return this.__ViewUtils_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_34", {
        get: function () {
            if ((this.__IterableDiffers_34 == null)) {
                (this.__IterableDiffers_34 = import3._iterableDiffersFactory());
            }
            return this.__IterableDiffers_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_35", {
        get: function () {
            if ((this.__KeyValueDiffers_35 == null)) {
                (this.__KeyValueDiffers_35 = import3._keyValueDiffersFactory());
            }
            return this.__KeyValueDiffers_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_36", {
        get: function () {
            if ((this.__SharedStylesHost_36 == null)) {
                (this.__SharedStylesHost_36 = this._DomSharedStylesHost_25);
            }
            return this.__SharedStylesHost_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_37", {
        get: function () {
            if ((this.__Title_37 == null)) {
                (this.__Title_37 = new import22.Title());
            }
            return this.__Title_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_FormBuilder_38", {
        get: function () {
            if ((this.__FormBuilder_38 == null)) {
                (this.__FormBuilder_38 = new import23.FormBuilder());
            }
            return this.__FormBuilder_38;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RadioControlRegistry_39", {
        get: function () {
            if ((this.__RadioControlRegistry_39 == null)) {
                (this.__RadioControlRegistry_39 = new import24.RadioControlRegistry());
            }
            return this.__RadioControlRegistry_39;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_40", {
        get: function () {
            if ((this.__BrowserXhr_40 == null)) {
                (this.__BrowserXhr_40 = new import25.BrowserXhr());
            }
            return this.__BrowserXhr_40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_41", {
        get: function () {
            if ((this.__ResponseOptions_41 == null)) {
                (this.__ResponseOptions_41 = new import26.BaseResponseOptions());
            }
            return this.__ResponseOptions_41;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_42", {
        get: function () {
            if ((this.__XSRFStrategy_42 == null)) {
                (this.__XSRFStrategy_42 = import8._createDefaultCookieXSRFStrategy());
            }
            return this.__XSRFStrategy_42;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_43", {
        get: function () {
            if ((this.__XHRBackend_43 == null)) {
                (this.__XHRBackend_43 = new import27.XHRBackend(this._BrowserXhr_40, this._ResponseOptions_41, this._XSRFStrategy_42));
            }
            return this.__XHRBackend_43;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_44", {
        get: function () {
            if ((this.__RequestOptions_44 == null)) {
                (this.__RequestOptions_44 = new import28.BaseRequestOptions());
            }
            return this.__RequestOptions_44;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_45", {
        get: function () {
            if ((this.__Http_45 == null)) {
                (this.__Http_45 = import8.httpFactory(this._XHRBackend_43, this._RequestOptions_44));
            }
            return this.__Http_45;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_CONFIGURATION_46", {
        get: function () {
            if ((this.__ROUTER_CONFIGURATION_46 == null)) {
                (this.__ROUTER_CONFIGURATION_46 = {});
            }
            return this.__ROUTER_CONFIGURATION_46;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_LocationStrategy_47", {
        get: function () {
            if ((this.__LocationStrategy_47 == null)) {
                (this.__LocationStrategy_47 = import7.provideLocationStrategy(this.parent.get(import49.PlatformLocation), this.parent.get(import50.APP_BASE_HREF, null), this._ROUTER_CONFIGURATION_46));
            }
            return this.__LocationStrategy_47;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Location_48", {
        get: function () {
            if ((this.__Location_48 == null)) {
                (this.__Location_48 = new import29.Location(this._LocationStrategy_47));
            }
            return this.__Location_48;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_UrlSerializer_49", {
        get: function () {
            if ((this.__UrlSerializer_49 == null)) {
                (this.__UrlSerializer_49 = new import30.DefaultUrlSerializer());
            }
            return this.__UrlSerializer_49;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RouterOutletMap_50", {
        get: function () {
            if ((this.__RouterOutletMap_50 == null)) {
                (this.__RouterOutletMap_50 = new import31.RouterOutletMap());
            }
            return this.__RouterOutletMap_50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgModuleFactoryLoader_51", {
        get: function () {
            if ((this.__NgModuleFactoryLoader_51 == null)) {
                (this.__NgModuleFactoryLoader_51 = new import32.SystemJsNgModuleLoader(this._Compiler_19, this.parent.get(import32.SystemJsNgModuleLoaderConfig, null)));
            }
            return this.__NgModuleFactoryLoader_51;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTES_52", {
        get: function () {
            if ((this.__ROUTES_52 == null)) {
                (this.__ROUTES_52 = [[
                        {
                            path: 'login',
                            component: import51.LoginPageComponent
                        },
                        {
                            path: '',
                            component: import52.HomePageComponent
                        }
                    ]
                ]);
            }
            return this.__ROUTES_52;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Router_53", {
        get: function () {
            if ((this.__Router_53 == null)) {
                (this.__Router_53 = import7.setupRouter(this._ApplicationRef_18, this._UrlSerializer_49, this._RouterOutletMap_50, this._Location_48, this, this._NgModuleFactoryLoader_51, this._Compiler_19, this._ROUTES_52, this._ROUTER_CONFIGURATION_46, this.parent.get(import53.UrlHandlingStrategy, null), this.parent.get(import54.RouteReuseStrategy, null)));
            }
            return this.__Router_53;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ActivatedRoute_54", {
        get: function () {
            if ((this.__ActivatedRoute_54 == null)) {
                (this.__ActivatedRoute_54 = import7.rootRoute(this._Router_53));
            }
            return this.__ActivatedRoute_54;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_PreloadAllModules_58", {
        get: function () {
            if ((this.__PreloadAllModules_58 == null)) {
                (this.__PreloadAllModules_58 = new import33.PreloadAllModules());
            }
            return this.__PreloadAllModules_58;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_INITIALIZER_59", {
        get: function () {
            if ((this.__ROUTER_INITIALIZER_59 == null)) {
                (this.__ROUTER_INITIALIZER_59 = import7.getBootstrapListener(this._RouterInitializer_13));
            }
            return this.__ROUTER_INITIALIZER_59;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_BOOTSTRAP_LISTENER_60", {
        get: function () {
            if ((this.__APP_BOOTSTRAP_LISTENER_60 == null)) {
                (this.__APP_BOOTSTRAP_LISTENER_60 = [this._ROUTER_INITIALIZER_59]);
            }
            return this.__APP_BOOTSTRAP_LISTENER_60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateLoader_61", {
        get: function () {
            if ((this.__TranslateLoader_61 == null)) {
                (this.__TranslateLoader_61 = import1.createTranslateLoader(this._Http_45));
            }
            return this.__TranslateLoader_61;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateParser_62", {
        get: function () {
            if ((this.__TranslateParser_62 == null)) {
                (this.__TranslateParser_62 = new import34.TranslateDefaultParser());
            }
            return this.__TranslateParser_62;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_MissingTranslationHandler_63", {
        get: function () {
            if ((this.__MissingTranslationHandler_63 == null)) {
                (this.__MissingTranslationHandler_63 = new import35.FakeMissingTranslationHandler());
            }
            return this.__MissingTranslationHandler_63;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateStore_64", {
        get: function () {
            if ((this.__TranslateStore_64 == null)) {
                (this.__TranslateStore_64 = new import36.TranslateStore());
            }
            return this.__TranslateStore_64;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_USE_STORE_65", {
        get: function () {
            if ((this.__USE_STORE_65 == null)) {
                (this.__USE_STORE_65 = undefined);
            }
            return this.__USE_STORE_65;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateService_66", {
        get: function () {
            if ((this.__TranslateService_66 == null)) {
                (this.__TranslateService_66 = new import37.TranslateService(this._TranslateStore_64, this._TranslateLoader_61, this._TranslateParser_62, this._MissingTranslationHandler_63, this._USE_STORE_65));
            }
            return this.__TranslateService_66;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AuthService_67", {
        get: function () {
            if ((this.__AuthService_67 == null)) {
                (this.__AuthService_67 = new import38.AuthService(this._Http_45));
            }
            return this.__AuthService_67;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new import2.CommonModule();
        this._ApplicationModule_1 = new import3.ApplicationModule();
        this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule, null));
        this._InternalFormsSharedModule_3 = new import5.InternalFormsSharedModule();
        this._ReactiveFormsModule_4 = new import6.ReactiveFormsModule();
        this._ROUTER_FORROOT_GUARD_5 = import7.provideForRootGuard(this.parent.get(import55.Router, null));
        this._RouterModule_6 = new import7.RouterModule(this._ROUTER_FORROOT_GUARD_5);
        this._HttpModule_7 = new import8.HttpModule();
        this._TranslateModule_8 = new import9.TranslateModule();
        this._AppModule_9 = new import1.AppModule();
        this._ErrorHandler_12 = import4.errorHandler();
        this._RouterInitializer_13 = new import7.RouterInitializer(this);
        this._APP_INITIALIZER_14 = [import7.getAppInitializer(this._RouterInitializer_13)];
        this._ApplicationInitStatus_15 = new import11.ApplicationInitStatus(this._APP_INITIALIZER_14);
        this._Testability_16 = new import12.Testability(this.parent.get(import47.NgZone));
        this._ApplicationRef__17 = new import13.ApplicationRef_(this.parent.get(import47.NgZone), this.parent.get(import56.Console), this, this._ErrorHandler_12, this, this._ApplicationInitStatus_15, this.parent.get(import12.TestabilityRegistry, null), this._Testability_16);
        this._DomSharedStylesHost_25 = new import17.DomSharedStylesHost(this._DOCUMENT_21);
        this._NoPreloading_55 = new import33.NoPreloading();
        this._PreloadingStrategy_56 = this._NoPreloading_55;
        this._RouterPreloader_57 = new import33.RouterPreloader(this._Router_53, this._NgModuleFactoryLoader_51, this._Compiler_19, this, this._PreloadingStrategy_56);
        return this._AppModule_9;
    };
    AppModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === import2.CommonModule)) {
            return this._CommonModule_0;
        }
        if ((token === import3.ApplicationModule)) {
            return this._ApplicationModule_1;
        }
        if ((token === import4.BrowserModule)) {
            return this._BrowserModule_2;
        }
        if ((token === import5.InternalFormsSharedModule)) {
            return this._InternalFormsSharedModule_3;
        }
        if ((token === import6.ReactiveFormsModule)) {
            return this._ReactiveFormsModule_4;
        }
        if ((token === import7.ROUTER_FORROOT_GUARD)) {
            return this._ROUTER_FORROOT_GUARD_5;
        }
        if ((token === import7.RouterModule)) {
            return this._RouterModule_6;
        }
        if ((token === import8.HttpModule)) {
            return this._HttpModule_7;
        }
        if ((token === import9.TranslateModule)) {
            return this._TranslateModule_8;
        }
        if ((token === import1.AppModule)) {
            return this._AppModule_9;
        }
        if ((token === import43.LOCALE_ID)) {
            return this._LOCALE_ID_10;
        }
        if ((token === import10.NgLocalization)) {
            return this._NgLocalization_11;
        }
        if ((token === import57.ErrorHandler)) {
            return this._ErrorHandler_12;
        }
        if ((token === import7.RouterInitializer)) {
            return this._RouterInitializer_13;
        }
        if ((token === import11.APP_INITIALIZER)) {
            return this._APP_INITIALIZER_14;
        }
        if ((token === import11.ApplicationInitStatus)) {
            return this._ApplicationInitStatus_15;
        }
        if ((token === import12.Testability)) {
            return this._Testability_16;
        }
        if ((token === import13.ApplicationRef_)) {
            return this._ApplicationRef__17;
        }
        if ((token === import13.ApplicationRef)) {
            return this._ApplicationRef_18;
        }
        if ((token === import14.Compiler)) {
            return this._Compiler_19;
        }
        if ((token === import44.APP_ID)) {
            return this._APP_ID_20;
        }
        if ((token === import58.DOCUMENT)) {
            return this._DOCUMENT_21;
        }
        if ((token === import15.HAMMER_GESTURE_CONFIG)) {
            return this._HAMMER_GESTURE_CONFIG_22;
        }
        if ((token === import16.EVENT_MANAGER_PLUGINS)) {
            return this._EVENT_MANAGER_PLUGINS_23;
        }
        if ((token === import16.EventManager)) {
            return this._EventManager_24;
        }
        if ((token === import17.DomSharedStylesHost)) {
            return this._DomSharedStylesHost_25;
        }
        if ((token === import59.AnimationDriver)) {
            return this._AnimationDriver_26;
        }
        if ((token === import18.DomRootRenderer)) {
            return this._DomRootRenderer_27;
        }
        if ((token === import13.NgProbeToken)) {
            return this._NgProbeToken_28;
        }
        if ((token === import60.RootRenderer)) {
            return this._RootRenderer_29;
        }
        if ((token === import19.DomSanitizer)) {
            return this._DomSanitizer_30;
        }
        if ((token === import61.Sanitizer)) {
            return this._Sanitizer_31;
        }
        if ((token === import20.AnimationQueue)) {
            return this._AnimationQueue_32;
        }
        if ((token === import21.ViewUtils)) {
            return this._ViewUtils_33;
        }
        if ((token === import62.IterableDiffers)) {
            return this._IterableDiffers_34;
        }
        if ((token === import63.KeyValueDiffers)) {
            return this._KeyValueDiffers_35;
        }
        if ((token === import17.SharedStylesHost)) {
            return this._SharedStylesHost_36;
        }
        if ((token === import22.Title)) {
            return this._Title_37;
        }
        if ((token === import23.FormBuilder)) {
            return this._FormBuilder_38;
        }
        if ((token === import24.RadioControlRegistry)) {
            return this._RadioControlRegistry_39;
        }
        if ((token === import25.BrowserXhr)) {
            return this._BrowserXhr_40;
        }
        if ((token === import26.ResponseOptions)) {
            return this._ResponseOptions_41;
        }
        if ((token === import64.XSRFStrategy)) {
            return this._XSRFStrategy_42;
        }
        if ((token === import27.XHRBackend)) {
            return this._XHRBackend_43;
        }
        if ((token === import28.RequestOptions)) {
            return this._RequestOptions_44;
        }
        if ((token === import65.Http)) {
            return this._Http_45;
        }
        if ((token === import7.ROUTER_CONFIGURATION)) {
            return this._ROUTER_CONFIGURATION_46;
        }
        if ((token === import50.LocationStrategy)) {
            return this._LocationStrategy_47;
        }
        if ((token === import29.Location)) {
            return this._Location_48;
        }
        if ((token === import30.UrlSerializer)) {
            return this._UrlSerializer_49;
        }
        if ((token === import31.RouterOutletMap)) {
            return this._RouterOutletMap_50;
        }
        if ((token === import66.NgModuleFactoryLoader)) {
            return this._NgModuleFactoryLoader_51;
        }
        if ((token === import67.ROUTES)) {
            return this._ROUTES_52;
        }
        if ((token === import55.Router)) {
            return this._Router_53;
        }
        if ((token === import68.ActivatedRoute)) {
            return this._ActivatedRoute_54;
        }
        if ((token === import33.NoPreloading)) {
            return this._NoPreloading_55;
        }
        if ((token === import33.PreloadingStrategy)) {
            return this._PreloadingStrategy_56;
        }
        if ((token === import33.RouterPreloader)) {
            return this._RouterPreloader_57;
        }
        if ((token === import33.PreloadAllModules)) {
            return this._PreloadAllModules_58;
        }
        if ((token === import7.ROUTER_INITIALIZER)) {
            return this._ROUTER_INITIALIZER_59;
        }
        if ((token === import44.APP_BOOTSTRAP_LISTENER)) {
            return this._APP_BOOTSTRAP_LISTENER_60;
        }
        if ((token === import69.TranslateLoader)) {
            return this._TranslateLoader_61;
        }
        if ((token === import34.TranslateParser)) {
            return this._TranslateParser_62;
        }
        if ((token === import35.MissingTranslationHandler)) {
            return this._MissingTranslationHandler_63;
        }
        if ((token === import36.TranslateStore)) {
            return this._TranslateStore_64;
        }
        if ((token === import37.USE_STORE)) {
            return this._USE_STORE_65;
        }
        if ((token === import37.TranslateService)) {
            return this._TranslateService_66;
        }
        if ((token === import38.AuthService)) {
            return this._AuthService_67;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__17.ngOnDestroy();
        this._DomSharedStylesHost_25.ngOnDestroy();
        this._RouterPreloader_57.ngOnDestroy();
    };
    return AppModuleInjector;
}(import0.NgModuleInjector));
export var AppModuleNgFactory = new import0.NgModuleFactory(AppModuleInjector, import1.AppModule);
//# sourceMappingURL=app.module.ngfactory.js.map