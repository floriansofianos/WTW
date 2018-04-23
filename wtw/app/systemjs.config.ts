/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
let System: any
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/',
            underscore: './node_modules/underscore/underscore.js',
            hammerjs: './node_modules/hammerjs/hammer.min.js'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the js folder
            app: 'js',
            // karma server files
            karma: 'app',
            // ngx-translate
            '@ngx-translate/core': 'npm:@ngx-translate/core/bundles/core.umd.js',
            '@ngx-translate/http-loader': 'npm:@ngx-translate/http-loader/bundles/http-loader.umd.js',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
            '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
            '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
            '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
            '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
            '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
            '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
            '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
            '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
            '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
            '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',
            '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
            '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
            '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-spinner': 'npm:angular2-spinner/dist',
            'angular-star-rating': 'npm:angular-star-rating/angular-star-rating.umd.js',
            'angular2-ui-switch': 'npm:angular2-ui-switch/dist',
            'nouislider': 'npm:nouislider',
            'ng2-nouislider': 'npm:ng2-nouislider',
            'ngx-infinite-scroll': 'npm:ngx-infinite-scroll/bundles/ngx-infinite-scroll.umd.min.js',
            'ng2-validation': 'npm:ng2-validation/bundles/ng2-validation.umd.js',
            'ngx-modialog': 'npm:ngx-modialog/bundle/ngx-modialog.rollup.umd.min.js',
            'ngx-modialog/plugins/bootstrap': 'npm:ngx-modialog/plugins/bootstrap/bundle/ngx-modialog-bootstrap.rollup.umd.min.js',
            'libphonenumber-js': 'npm:libphonenumber-js/bundle/libphonenumber-js.min.js',
            'raven-js': 'npm:raven-js',
            'ngx-device-detector': 'npm:ngx-device-detector/ngx-device-detector.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            karma: {
                defaultExtension: 'js',
            },
            app: {
                main: './js/main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-spinner': {
                defaultExtension: 'js',
                main: 'index.js'
            },
            'angular2-ui-switch': {
                defaultExtension: 'js',
                main: 'index.js'
            },
            'nouislider': { main: 'distribute/nouislider.js', defaultExtension: 'js' },
            'ng2-nouislider': { main: 'src/nouislider.js', defaultExtension: 'js' },
            'raven-js': {
                main: 'dist/raven.js'
            }
        }
    });
})(this);
