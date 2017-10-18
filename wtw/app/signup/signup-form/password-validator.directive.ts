import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validatePassword]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }]
})

export class PasswordValidator implements Validator {
    validate(formControl: FormControl): { [key: string]: any } {
        if (formControl && formControl.value
            && formControl.value.length > 7) {
            return null;
        } else {
            return { validatePassword: false }
        }
    }
}