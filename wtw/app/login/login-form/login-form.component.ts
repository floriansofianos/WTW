import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'

@Component({
    selector: 'login-form',
    template: `
<form [formGroup]="loginForm" (ngSubmit)="login(loginForm.value)"
      autocomplete="off" novalidate>
    <p class="form-group">
        <input id="login" formControlName="login" type="text" placeholder="{{ 'LOGIN.FORM.LOGIN' | translate }}" />
    </p>
    <p class="form-group">
        <input id="password" formControlName="password" type="text" placeholder="{{ 'LOGIN.FORM.PASSWORD' | translate }}" />
    </p>
    <button type="submit" class="button-submit">{{ 'FORM.OK' | translate }}</button>
    <button type="submit" class="button-cancel" (click)="cancel()">{{ 'FORM.CANCEL' | translate }}</button>
</form>
<div *ngIf="showError">An error occured while login</div>
`
})

export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    showError: boolean;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        let login = new FormControl();
        let password = new FormControl();

        this.loginForm = new FormGroup({
            login: login,
            password: password
        });
    }

    cancel() {
        this.router.navigate(['']);
    }

    login(formValues: any) {
        this.authService.loginUser(formValues.login, formValues.password).subscribe(response => {
            this.authService.setCurrentUser(response.json());
            this.router.navigate(['']);
        },
        error => {
            this.showError = true;
        });
    }
}