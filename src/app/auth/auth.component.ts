import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true
    isLoading = false
    error: string = null

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        // extra validation step in case if user manipulates the disabled prop on browser dev tools
        if (!form.valid) {
            return
        }
        const email = form.value.email
        const password = form.value.password

        let authObs: Observable<AuthResponseData>

        this.isLoading = true

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(
            resData => {
                console.log('RES', resData)
                this.isLoading = false
                // navigate to recipes if login or signup is successful
                this.router.navigate(['/recipes'])
            }, 
            // error is handled in the auth.service, and we only get a message
            errorMessage => {
                console.log('ERR', errorMessage)
                this.error = errorMessage
                this.isLoading = false
            })


        form.reset()
    }
}