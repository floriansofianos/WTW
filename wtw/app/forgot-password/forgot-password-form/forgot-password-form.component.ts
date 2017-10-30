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

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private translate: TranslateService) { }

    ngOnInit(): void {
        let password = new FormControl();
        let confirmPassword = new FormControl();

        this.forgotPasswordForm = new FormGroup({
            password: password,
            confirmPassword: confirmPassword
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.token = params['token'];
        });
    }

    confirmPassword(formValues: any) {
        this.showSpinner = true;
        if (formValues.password != formValues.confirmPassword) {
            this.showError = true;
            this.showSpinner = false;
        }
        else {
            this.authService.changePassword(this.token, formValues.password).subscribe(response => {
                this.router.navigate(['/login']);
            },
                error => {
                    this.showError = true;
                    this.showSpinner = false;
                });
        }
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.confirmPassword(this.forgotPasswordForm.value);
        }
    }
}