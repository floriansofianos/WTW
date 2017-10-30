import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'forgot-password-form',
    templateUrl: 'forgot-password-form.component.html'
})

export class ForgotPasswordFormComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    showError: boolean;
    showSpinner: boolean;
    showErrorValidation: boolean;

    constructor(private router: Router, private authService: AuthService, private translate: TranslateService) { }

    ngOnInit(): void {
        let password = new FormControl();
        let confirmPassword = new FormControl();

        this.forgotPasswordForm = new FormGroup({
            password: password,
            confirmPassword: confirmPassword
        });
    }

    confirmPassword(formValues: any) {
        this.showSpinner = true;
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.confirmPassword(this.forgotPasswordForm.value);
        }
    }
}