import { Component } from '@angular/core'

@Component({
    template: `
<div class="login-top-container"><logo></logo><div class="login-title">{{ 'LOGIN.TITLE' | translate }}</div></div>
<login-form></login-form>
`
})

export class LoginPageComponent {

}