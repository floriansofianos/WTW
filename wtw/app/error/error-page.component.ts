import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';

@Component({
    template: `
<div class="error-container">
    <div class="error-content">
        <i class="fa fa-chain-broken"></i>
        <div class="error">{{'ERROR.TEXT' | translate}}</div>
    </div>
</div>
`
})

export class ErrorPageComponent {}