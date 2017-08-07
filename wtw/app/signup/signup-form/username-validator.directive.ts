import { Directive } from '@angular/core';
import { FormControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Observable } from "rxjs/Rx";

@Directive({
    selector: '[validateUsername]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UsernameValidator, multi: true }]
})

export class UsernameValidator {

    constructor(private authService: AuthService) { }

    validate(formControl: FormControl) {
        return new Promise(resolve => {
            if (formControl && formControl.value) {
                this.authService.verifyUsername(formControl.value).subscribe(response => {
                    if (!response.json().isTaken) return resolve(null);
                    else return resolve({ validateUsername: true });
                },
                    error => {
                        return resolve({ validateUsername: true });
                    });
            } else {
                return resolve({ validateUsername: true });
            }
        });
    }
}