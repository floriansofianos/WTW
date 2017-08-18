/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
let System: any
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
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
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-spinner': 'npm:angular2-spinner/dist',
            'angular2-ui-switch': 'npm:angular2-ui-switch/dist',
            'nouislider': 'npm:nouislider',
            'ng2-nouislider': 'npm:ng2-nouislider',
            'ng2-validation': 'npm:ng2-validation/bundles/ng2-validation.umd.js',
            'libphonenumber-js': 'npm:libphonenumber-js/bundle/libphonenumber-js.min.js'
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
            'ng2-nouislider': { main: 'src/nouislider.js', defaultExtension: 'js' }
        }
    });
})(this);
