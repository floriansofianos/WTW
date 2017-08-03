import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CustomValidators } from 'ng2-validation';

@Component({
    moduleId: module.id,
    selector: 'signup-form',
    templateUrl: 'signup-form.component.html'
})

export class SignUpFormComponent implements OnInit {
    signupForm: FormGroup;
    backendError: string;
    showSpinner: boolean;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            email: new FormControl(null, [Validators.required, CustomValidators.email]),
            password: new FormControl(),
            confirmPassword: new FormControl(),
            username: new FormControl(),
            firstName: new FormControl(),
            lastName: new FormControl()
        });
    }

    cancel() {
        this.router.navigate(['']);
    }

    signup(formValues: any) {
        if (this.signupForm.valid) {
            this.showSpinner = true;
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
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.email && this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty
    }

    isEmailEmpty(): boolean {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.required && this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty
    }
}