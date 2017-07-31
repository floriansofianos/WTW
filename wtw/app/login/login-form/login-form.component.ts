import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'

@Component({
    selector: 'login-form',
    template: `
<form id="login-form" [formGroup]="loginForm" autocomplete="off" novalidate>
    <div class="login-line">
        <input id="login" formControlName="login" type="text" placeholder="{{ 'LOGIN.FORM.LOGIN' | translate }}" />
    </div>
    <div class="login-line">
        <input id="password" formControlName="password" type="password" placeholder="{{ 'LOGIN.FORM.PASSWORD' | translate }}" />
    </div>
    <div class="login-line login-error" *ngIf="showError">{{ 'LOGIN.FORM.WRONGPASSWORD' | translate }}</div>
    <div class="login-line button-line" *ngIf="!showSpinner">
        <a class="button button-ok" (click)="login(loginForm.value)">{{ 'FORM.OK' | translate }}</a>
        <a class="button" (click)="cancel()">{{ 'FORM.CANCEL' | translate }}</a>
    </div>
    <div class="login-line button-line" *ngIf="showSpinner"><spinner></spinner></div>
</form>
`
})

export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    showError: boolean;
    showSpinner: boolean;

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
        this.showSpinner = true;
        this.authService.loginUser(formValues.login, formValues.password).subscribe(response => {
            this.authService.setCurrentUser(response.json());
            this.router.navigate(['']);
        },
        error => {
            this.showError = true;
            this.showSpinner = false;
        });
    }
}