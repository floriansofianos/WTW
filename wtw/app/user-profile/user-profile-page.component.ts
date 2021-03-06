﻿import { Component, ViewChild } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CountriesService } from '../countries/countries.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-profile-page.component.html'
})

export class UserProfilePageComponent {
    username: string;
    isLoading: boolean;
    user: any;
    photoData: any;
    countriesList: Array<any>;
    profileForm: any;
    labelDeleteConfirm: string;
    @ViewChild('fileInput') fileInput;

    constructor(private authService: AuthService, private router: Router, private userService: UserService, private countriesService: CountriesService, private translate: TranslateService) { }

    ngOnInit() {
        this.isLoading = true;
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.user = currentUser;
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.translate.get('USER_PROFILE.DELETE_CONFIRM').subscribe((res: string) => {
                this.labelDeleteConfirm = res;
            });
            this.countriesService.getAll().subscribe(response => {
                this.countriesList = response.json().countries;
                this.profileForm = {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    yearOfBirth: this.user.yearOfBirth,
                    selectedCountry: this.user.country
                }
                this.updatePhoto();
            },
                error => {
                    throw new Error(error);
                });
            
        }
        else {
            this.router.navigate(['']);
        }
    }

    updatePhoto() {
        this.isLoading = true;
        this.userService.getAvatar(this.user.id, 'big').subscribe(res => {
            var data = res.json();
            if (data && data.success) {
                this.photoData = data.data;
            }
            else this.photoData = null;
            this.isLoading = false;
        },
            error => {
                throw new Error(error);
            }
        );
    }

    upload() {
        this.isLoading = true;
        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            formData.append("image", fileBrowser.files[0]);
            this.userService.uploadAvatar(formData).subscribe(res => {
                setTimeout(() => {   
                    this.updatePhoto();
                }, 10000);
            },
                error => {
                    throw new Error(error);
                }
            );
        }
    }

    delete() {
        if (confirm(this.labelDeleteConfirm)) {
            this.userService.deleteAvatar().subscribe(res => {
                this.updatePhoto();
            },
                error => {
                    throw new Error(error);
                }
            );
        }
    }

    save() {
        this.isLoading = true
        this.authService.setUserProperties(this.profileForm).subscribe(res => {
            this.isLoading = false;
        },
            error => {
                throw new Error(error);
            }
        );
    }
}