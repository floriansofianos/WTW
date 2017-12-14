import { Component, ViewChild } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CountriesService } from '../countries/countries.service';
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
    @ViewChild('fileInput') fileInput;

    constructor(private authService: AuthService, private router: Router, private userService: UserService, private countriesService: CountriesService) { }

    ngOnInit() {
        this.isLoading = true;
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.user = currentUser;
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
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
                    this.router.navigate(['error']);
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
                this.router.navigate(['error']);
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
                this.updatePhoto();
            },
                error => {
                    this.router.navigate(['error']);
                }
            );
        }
    }

    delete() {
        this.userService.deleteAvatar().subscribe(res => {
            this.updatePhoto();
        },
            error => {
                this.router.navigate(['error']);
            }
        );
    }

    save() {
        this.isLoading = true
        this.authService.setUserProperties(this.profileForm).subscribe(res => {
            this.isLoading = false;
        },
            error => {
                this.router.navigate(['error']);
            }
        );
    }
}