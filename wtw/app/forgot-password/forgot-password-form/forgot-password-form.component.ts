import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    token: string;
    isSubmitted: boolean;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private translate: TranslateService) { }

    ngOnInit(): void {
        let password = new FormControl();
        let confirmPassword = new FormControl();

        this.forgotPasswordForm = new FormGroup({
            password: password,
            confirmPassword: confirmPassword
        });
    }

    confirmPassword(formValues: any) {
        this.isSubmitted = true;
        if (this.forgotPasswordForm.valid) {
            this.showSpinner = true;
            this.authService.changePassword(this.activatedRoute.snapshot.queryParams['token'], formValues.password).subscribe(response => {
                this.router.navigate(['/login']);
            },
                error => {
                    this.showError = true;
                    this.showSpinner = false;
                });
        }
    }

    isPasswordStrongEnough(): boolean {
        return ((this.forgotPasswordForm.controls.password.touched && this.forgotPasswordForm.controls.password.dirty) || this.isSubmitted) && this.forgotPasswordForm.controls.password.errors != null;
    }

    isConfirmPasswordInvalid(): boolean {
        return ((this.forgotPasswordForm.controls.password.touched && this.forgotPasswordForm.controls.password.dirty && this.forgotPasswordForm.controls.confirmPassword.touched && this.forgotPasswordForm.controls.confirmPassword.dirty) || this.isSubmitted)
            && this.forgotPasswordForm.errors != null;
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.confirmPassword(this.forgotPasswordForm.value);
        }
    }
}