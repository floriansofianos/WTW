import { Component } from '@angular/core'

@Component({
    template: `
<div class="login-top-container"><logo></logo><div class="login-title">{{ 'SIGNUP.TITLE' | translate }}</div></div>
<signup-form></signup-form>
`
})

export class SignUpPageComponent {

}