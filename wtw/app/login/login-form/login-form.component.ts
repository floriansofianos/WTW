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
    showError: boolean;
    showSpinner: boolean;

    constructor(private router: Router, private authService: AuthService, private translate: TranslateService) { }

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
            let currentUser = response.json();
            this.authService.setCurrentUser(currentUser);
            if (currentUser.lang) this.translate.use(currentUser.lang)
            this.router.navigate(['']);
        },
        error => {
            this.showError = true;
            this.showSpinner = false;
        });
    }
}