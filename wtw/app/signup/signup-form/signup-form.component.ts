import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'

@Component({
    moduleId: module.id,
    selector: 'signup-form',
    templateUrl: 'signup-form.component.html'
})

export class SignupFormComponent implements OnInit {
    signupForm: FormGroup;
    showError: boolean;
    showSpinner: boolean;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        let login = new FormControl();
        let password = new FormControl();

        this.signupForm = new FormGroup({
            login: login,
            password: password
        });
    }

    cancel() {
        this.router.navigate(['']);
    }

    signup(formValues: any) {
        this.showSpinner = true;
    }
}