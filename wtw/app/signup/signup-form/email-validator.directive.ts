import { Directive } from '@angular/core';
import { FormControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Observable } from "rxjs/Rx";

@Directive({
    selector: '[validateEmail]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidator, multi: true }]
})

export class EmailValidator {

    constructor(private authService: AuthService) { }

    validate(formControl: FormControl) {
        return new Promise(resolve => {
            if (formControl && formControl.value) {
                this.authService.verifyEmail(formControl.value).subscribe(response => {
                    if (!response.json().isTaken) return resolve(null);
                    else return resolve({ validateEmail: true });
                },
                    error => {
                        return resolve({ validateEmail: true });
                    });
            } else {
                return resolve({ validateEmail: true });
            }
        });
    }
}