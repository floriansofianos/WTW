import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})

export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    forgotPasswordForm: FormGroup;
    showError: boolean;
    showSpinner: boolean;
    showErrorValidation: boolean;
    showForgotPassword: boolean;
    showSpinnerForgotPassword: boolean;
    showForgotPasswordEmailSent: boolean;
    showForgotPasswordError: boolean;

    constructor(private router: Router, private authService: AuthService, private translate: TranslateService) { }

    ngOnInit(): void {
        let login = new FormControl();
        let password = new FormControl();
        let rememberMe = new FormControl();

        let email = new FormControl();

        this.loginForm = new FormGroup({
            login: login,
            password: password,
            rememberMe: rememberMe
        });

        this.forgotPasswordForm = new FormGroup({
            email: email
        });

        this.showForgotPassword = false;
    }

    cancel() {
        this.router.navigate(['']);
    }

    login(formValues: any) {
        this.showSpinner = true;
        this.authService.loginUser(formValues.login, formValues.password, formValues.rememberMe).subscribe(response => {
            let currentUser = response.json();
            this.authService.setCurrentUser(currentUser);
            if (currentUser.lang) this.translate.use(currentUser.lang)
            this.router.navigate(['/user/home']);
        },
            error => {
                if (error == 500) this.showErrorValidation = true;
                else this.showError = true;
                this.showSpinner = false;
        });
    }

    forgotPasswordClick() {
        this.showForgotPassword = true;
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.login(this.loginForm.value);
        }
    }

    clickForgotPassword() {
        this.showForgotPassword = true;
    }

    cancelForgotPassword() {
        this.showForgotPassword = false;
    }

    forgotPassword(formValues: any) {
        this.showSpinnerForgotPassword = true;
        this.authService.sendForgotPasswordEmail(formValues.email).subscribe(response => {
            this.showForgotPasswordEmailSent = true;
            this.showSpinnerForgotPassword = false;
        },
            error => {
                this.showForgotPasswordError = true;
                this.showSpinnerForgotPassword = false;
            });
    }

    resendWelcomeEmail(formValues: any) {
        this.authService.sendWelcomeEmail(formValues.login).subscribe(response => {
            this.showErrorValidation = false;
        },
            error => {
                this.router.navigate(['/error']);
            });
    }
}