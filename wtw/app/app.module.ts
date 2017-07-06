import { HttpModule, Http } from "@angular/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MainAppComponent } from './main-app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
    imports: [BrowserModule,
            HttpModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [Http]
                }
            })],
    declarations: [MainAppComponent],
    bootstrap: [MainAppComponent]
})

export class AppModule { }