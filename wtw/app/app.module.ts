import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { MainAppComponent } from './main-app.component'

@NgModule({
    imports: [BrowserModule],
    declarations: [MainAppComponent],
    bootstrap: [MainAppComponent]
})

export class AppModule { }