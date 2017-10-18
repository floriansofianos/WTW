import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'signup-form',
    templateUrl: 'signup-form.component.html'
})

export class SignUpFormComponent implements OnInit {
    signupForm: FormGroup;
    passwordGroup: FormGroup;
    backendError: string;
    showSpinner: boolean;
    isSubmitted: boolean;

    constructor(private router: Router, private authService: AuthService, private translate: TranslateService) { }

    ngOnInit(): void {
        this.passwordGroup = new FormGroup({
            password: new FormControl(),
            confirmPassword: new FormControl()
        })

        this.signupForm = new FormGroup({
            email: new FormControl(null, [Validators.required, CustomValidators.email]),
            passwordGroup: this.passwordGroup,
            username: new FormControl(null, Validators.required),
            firstName: new FormControl(),
            lastName: new FormControl()
        });
    }

    cancel() {
        this.router.navigate(['']);
    }

    signup(formValues: any) {
        this.isSubmitted = true;
        if (this.signupForm.valid) {
            this.showSpinner = true;
            formValues.lang = this.translate.currentLang;
            this.authService.signUp(formValues).subscribe(response => {
                this.authService.setCurrentUser(response.json());
                this.router.navigate(['']);
            },
                error => {
                    this.backendError = error;
                    this.showSpinner = false;
                });
        }
    }

    isEmailInvalid(): boolean {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.email && ((this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty) || this.isSubmitted);
    }

    isEmailEmpty(): boolean {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.required && ((this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty) || this.isSubmitted);
    }

    isUsernameEmpty(): boolean {
        return this.signupForm.controls.username.errors && this.signupForm.controls.username.errors.required && ((this.signupForm.controls.username.touched && this.signupForm.controls.username.dirty) || this.isSubmitted);
    }

    isPasswordStrongEnough(): boolean {
        return ((this.passwordGroup.controls.password.touched && this.passwordGroup.controls.password.dirty) || this.isSubmitted) && this.passwordGroup.controls.password.errors != null;
    }

    isConfirmPasswordInvalid(): boolean {
        return ((this.passwordGroup.controls.password.touched && this.passwordGroup.controls.password.dirty && this.passwordGroup.controls.confirmPassword.touched && this.passwordGroup.controls.confirmPassword.dirty) || this.isSubmitted)
            && this.passwordGroup.errors != null;
    }

    isEmailTaken(): boolean {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.validateEmail && ((this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty) || this.isSubmitted);
    }

    isUsernameTaken(): boolean {
        return this.signupForm.controls.username.errors && this.signupForm.controls.username.errors.validateUsername && ((this.signupForm.controls.username.touched && this.signupForm.controls.username.dirty) || this.isSubmitted);
    }
}