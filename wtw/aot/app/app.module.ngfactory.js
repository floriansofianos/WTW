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
import * as import5 from '@angular/http/src/http_module';
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
import * as import20 from '@angular/http/src/backends/browser_xhr';
import * as import21 from '@angular/http/src/base_response_options';
import * as import22 from '@angular/http/src/backends/xhr_backend';
import * as import23 from '@angular/http/src/base_request_options';
import * as import24 from '@ngx-translate/core/src/translate.parser';
import * as import25 from '@ngx-translate/core/src/missing-translation-handler';
import * as import26 from '@ngx-translate/core/src/translate.store';
import * as import27 from '@ngx-translate/core/src/translate.service';
import * as import29 from './main-app.component.ngfactory';
import * as import30 from '@angular/core/src/i18n/tokens';
import * as import31 from '@angular/core/src/application_tokens';
import * as import32 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import33 from '@angular/platform-browser/src/dom/events/key_events';
import * as import34 from '@angular/core/src/zone/ng_zone';
import * as import35 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import36 from '@angular/core/src/console';
import * as import37 from '@angular/core/src/error_handler';
import * as import38 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import39 from '@angular/platform-browser/src/dom/animation_driver';
import * as import40 from '@angular/core/src/render/api';
import * as import41 from '@angular/core/src/security';
import * as import42 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import43 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import44 from '@angular/http/src/interfaces';
import * as import45 from '@angular/http/src/http';
import * as import46 from '@ngx-translate/core/src/translate.loader';
var AppModuleInjector = (function (_super) {
    __extends(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        return _super.call(this, parent, [import29.MainAppComponentNgFactory], [import29.MainAppComponentNgFactory]) || this;
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_6", {
        get: function () {
            if ((this.__LOCALE_ID_6 == null)) {
                (this.__LOCALE_ID_6 = import3._localeFactory(this.parent.get(import30.LOCALE_ID, null)));
            }
            return this.__LOCALE_ID_6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_7", {
        get: function () {
            if ((this.__NgLocalization_7 == null)) {
                (this.__NgLocalization_7 = new import7.NgLocaleLocalization(this._LOCALE_ID_6));
            }
            return this.__NgLocalization_7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ApplicationRef_12", {
        get: function () {
            if ((this.__ApplicationRef_12 == null)) {
                (this.__ApplicationRef_12 = this._ApplicationRef__11);
            }
            return this.__ApplicationRef_12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_13", {
        get: function () {
            if ((this.__Compiler_13 == null)) {
                (this.__Compiler_13 = new import11.Compiler());
            }
            return this.__Compiler_13;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_14", {
        get: function () {
            if ((this.__APP_ID_14 == null)) {
                (this.__APP_ID_14 = import31._appIdRandomProviderFactory());
            }
            return this.__APP_ID_14;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_15", {
        get: function () {
            if ((this.__DOCUMENT_15 == null)) {
                (this.__DOCUMENT_15 = import4._document());
            }
            return this.__DOCUMENT_15;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_16", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_16 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_16 = new import12.HammerGestureConfig());
            }
            return this.__HAMMER_GESTURE_CONFIG_16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_17", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_17 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_17 = [
                    new import32.DomEventsPlugin(),
                    new import33.KeyEventsPlugin(),
                    new import12.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_16)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_17;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_18", {
        get: function () {
            if ((this.__EventManager_18 == null)) {
                (this.__EventManager_18 = new import13.EventManager(this._EVENT_MANAGER_PLUGINS_17, this.parent.get(import34.NgZone)));
            }
            return this.__EventManager_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_20", {
        get: function () {
            if ((this.__AnimationDriver_20 == null)) {
                (this.__AnimationDriver_20 = import4._resolveDefaultAnimationDriver());
            }
            return this.__AnimationDriver_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_21", {
        get: function () {
            if ((this.__DomRootRenderer_21 == null)) {
                (this.__DomRootRenderer_21 = new import15.DomRootRenderer_(this._DOCUMENT_15, this._EventManager_18, this._DomSharedStylesHost_19, this._AnimationDriver_20, this._APP_ID_14));
            }
            return this.__DomRootRenderer_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_22", {
        get: function () {
            if ((this.__RootRenderer_22 == null)) {
                (this.__RootRenderer_22 = import35._createConditionalRootRenderer(this._DomRootRenderer_21, this.parent.get(import35.NgProbeToken, null), this.parent.get(import10.NgProbeToken, null)));
            }
            return this.__RootRenderer_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_23", {
        get: function () {
            if ((this.__DomSanitizer_23 == null)) {
                (this.__DomSanitizer_23 = new import16.DomSanitizerImpl());
            }
            return this.__DomSanitizer_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_24", {
        get: function () {
            if ((this.__Sanitizer_24 == null)) {
                (this.__Sanitizer_24 = this._DomSanitizer_23);
            }
            return this.__Sanitizer_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationQueue_25", {
        get: function () {
            if ((this.__AnimationQueue_25 == null)) {
                (this.__AnimationQueue_25 = new import17.AnimationQueue(this.parent.get(import34.NgZone)));
            }
            return this.__AnimationQueue_25;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_26", {
        get: function () {
            if ((this.__ViewUtils_26 == null)) {
                (this.__ViewUtils_26 = new import18.ViewUtils(this._RootRenderer_22, this._Sanitizer_24, this._AnimationQueue_25));
            }
            return this.__ViewUtils_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_27", {
        get: function () {
            if ((this.__IterableDiffers_27 == null)) {
                (this.__IterableDiffers_27 = import3._iterableDiffersFactory());
            }
            return this.__IterableDiffers_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_28", {
        get: function () {
            if ((this.__KeyValueDiffers_28 == null)) {
                (this.__KeyValueDiffers_28 = import3._keyValueDiffersFactory());
            }
            return this.__KeyValueDiffers_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_29", {
        get: function () {
            if ((this.__SharedStylesHost_29 == null)) {
                (this.__SharedStylesHost_29 = this._DomSharedStylesHost_19);
            }
            return this.__SharedStylesHost_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_30", {
        get: function () {
            if ((this.__Title_30 == null)) {
                (this.__Title_30 = new import19.Title());
            }
            return this.__Title_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_31", {
        get: function () {
            if ((this.__BrowserXhr_31 == null)) {
                (this.__BrowserXhr_31 = new import20.BrowserXhr());
            }
            return this.__BrowserXhr_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_32", {
        get: function () {
            if ((this.__ResponseOptions_32 == null)) {
                (this.__ResponseOptions_32 = new import21.BaseResponseOptions());
            }
            return this.__ResponseOptions_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_33", {
        get: function () {
            if ((this.__XSRFStrategy_33 == null)) {
                (this.__XSRFStrategy_33 = import5._createDefaultCookieXSRFStrategy());
            }
            return this.__XSRFStrategy_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_34", {
        get: function () {
            if ((this.__XHRBackend_34 == null)) {
                (this.__XHRBackend_34 = new import22.XHRBackend(this._BrowserXhr_31, this._ResponseOptions_32, this._XSRFStrategy_33));
            }
            return this.__XHRBackend_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_35", {
        get: function () {
            if ((this.__RequestOptions_35 == null)) {
                (this.__RequestOptions_35 = new import23.BaseRequestOptions());
            }
            return this.__RequestOptions_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_36", {
        get: function () {
            if ((this.__Http_36 == null)) {
                (this.__Http_36 = import5.httpFactory(this._XHRBackend_34, this._RequestOptions_35));
            }
            return this.__Http_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateLoader_37", {
        get: function () {
            if ((this.__TranslateLoader_37 == null)) {
                (this.__TranslateLoader_37 = import1.createTranslateLoader(this._Http_36));
            }
            return this.__TranslateLoader_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateParser_38", {
        get: function () {
            if ((this.__TranslateParser_38 == null)) {
                (this.__TranslateParser_38 = new import24.TranslateDefaultParser());
            }
            return this.__TranslateParser_38;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_MissingTranslationHandler_39", {
        get: function () {
            if ((this.__MissingTranslationHandler_39 == null)) {
                (this.__MissingTranslationHandler_39 = new import25.FakeMissingTranslationHandler());
            }
            return this.__MissingTranslationHandler_39;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateStore_40", {
        get: function () {
            if ((this.__TranslateStore_40 == null)) {
                (this.__TranslateStore_40 = new import26.TranslateStore());
            }
            return this.__TranslateStore_40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_USE_STORE_41", {
        get: function () {
            if ((this.__USE_STORE_41 == null)) {
                (this.__USE_STORE_41 = undefined);
            }
            return this.__USE_STORE_41;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TranslateService_42", {
        get: function () {
            if ((this.__TranslateService_42 == null)) {
                (this.__TranslateService_42 = new import27.TranslateService(this._TranslateStore_40, this._TranslateLoader_37, this._TranslateParser_38, this._MissingTranslationHandler_39, this._USE_STORE_41));
            }
            return this.__TranslateService_42;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new import2.CommonModule();
        this._ApplicationModule_1 = new import3.ApplicationModule();
        this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule, null));
        this._HttpModule_3 = new import5.HttpModule();
        this._TranslateModule_4 = new import6.TranslateModule();
        this._AppModule_5 = new import1.AppModule();
        this._ErrorHandler_8 = import4.errorHandler();
        this._ApplicationInitStatus_9 = new import8.ApplicationInitStatus(this.parent.get(import8.APP_INITIALIZER, null));
        this._Testability_10 = new import9.Testability(this.parent.get(import34.NgZone));
        this._ApplicationRef__11 = new import10.ApplicationRef_(this.parent.get(import34.NgZone), this.parent.get(import36.Console), this, this._ErrorHandler_8, this, this._ApplicationInitStatus_9, this.parent.get(import9.TestabilityRegistry, null), this._Testability_10);
        this._DomSharedStylesHost_19 = new import14.DomSharedStylesHost(this._DOCUMENT_15);
        return this._AppModule_5;
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
        if ((token === import5.HttpModule)) {
            return this._HttpModule_3;
        }
        if ((token === import6.TranslateModule)) {
            return this._TranslateModule_4;
        }
        if ((token === import1.AppModule)) {
            return this._AppModule_5;
        }
        if ((token === import30.LOCALE_ID)) {
            return this._LOCALE_ID_6;
        }
        if ((token === import7.NgLocalization)) {
            return this._NgLocalization_7;
        }
        if ((token === import37.ErrorHandler)) {
            return this._ErrorHandler_8;
        }
        if ((token === import8.ApplicationInitStatus)) {
            return this._ApplicationInitStatus_9;
        }
        if ((token === import9.Testability)) {
            return this._Testability_10;
        }
        if ((token === import10.ApplicationRef_)) {
            return this._ApplicationRef__11;
        }
        if ((token === import10.ApplicationRef)) {
            return this._ApplicationRef_12;
        }
        if ((token === import11.Compiler)) {
            return this._Compiler_13;
        }
        if ((token === import31.APP_ID)) {
            return this._APP_ID_14;
        }
        if ((token === import38.DOCUMENT)) {
            return this._DOCUMENT_15;
        }
        if ((token === import12.HAMMER_GESTURE_CONFIG)) {
            return this._HAMMER_GESTURE_CONFIG_16;
        }
        if ((token === import13.EVENT_MANAGER_PLUGINS)) {
            return this._EVENT_MANAGER_PLUGINS_17;
        }
        if ((token === import13.EventManager)) {
            return this._EventManager_18;
        }
        if ((token === import14.DomSharedStylesHost)) {
            return this._DomSharedStylesHost_19;
        }
        if ((token === import39.AnimationDriver)) {
            return this._AnimationDriver_20;
        }
        if ((token === import15.DomRootRenderer)) {
            return this._DomRootRenderer_21;
        }
        if ((token === import40.RootRenderer)) {
            return this._RootRenderer_22;
        }
        if ((token === import16.DomSanitizer)) {
            return this._DomSanitizer_23;
        }
        if ((token === import41.Sanitizer)) {
            return this._Sanitizer_24;
        }
        if ((token === import17.AnimationQueue)) {
            return this._AnimationQueue_25;
        }
        if ((token === import18.ViewUtils)) {
            return this._ViewUtils_26;
        }
        if ((token === import42.IterableDiffers)) {
            return this._IterableDiffers_27;
        }
        if ((token === import43.KeyValueDiffers)) {
            return this._KeyValueDiffers_28;
        }
        if ((token === import14.SharedStylesHost)) {
            return this._SharedStylesHost_29;
        }
        if ((token === import19.Title)) {
            return this._Title_30;
        }
        if ((token === import20.BrowserXhr)) {
            return this._BrowserXhr_31;
        }
        if ((token === import21.ResponseOptions)) {
            return this._ResponseOptions_32;
        }
        if ((token === import44.XSRFStrategy)) {
            return this._XSRFStrategy_33;
        }
        if ((token === import22.XHRBackend)) {
            return this._XHRBackend_34;
        }
        if ((token === import23.RequestOptions)) {
            return this._RequestOptions_35;
        }
        if ((token === import45.Http)) {
            return this._Http_36;
        }
        if ((token === import46.TranslateLoader)) {
            return this._TranslateLoader_37;
        }
        if ((token === import24.TranslateParser)) {
            return this._TranslateParser_38;
        }
        if ((token === import25.MissingTranslationHandler)) {
            return this._MissingTranslationHandler_39;
        }
        if ((token === import26.TranslateStore)) {
            return this._TranslateStore_40;
        }
        if ((token === import27.USE_STORE)) {
            return this._USE_STORE_41;
        }
        if ((token === import27.TranslateService)) {
            return this._TranslateService_42;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__11.ngOnDestroy();
        this._DomSharedStylesHost_19.ngOnDestroy();
    };
    return AppModuleInjector;
}(import0.NgModuleInjector));
export var AppModuleNgFactory = new import0.NgModuleFactory(AppModuleInjector, import1.AppModule);
//# sourceMappingURL=app.module.ngfactory.js.map