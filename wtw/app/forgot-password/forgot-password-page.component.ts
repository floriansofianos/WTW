import { Component } from '@angular/core'

@Component({
    template: `
<div class="login-top-container"><logo></logo><div class="login-title">{{ 'FORGOT_PWD.TITLE' | translate }}</div></div>
<forgot-password-form></forgot-password-form>
`
})

export class ForgotPasswordPageComponent {

}