import { AppStateActions } from '../../../actionHandlers/appState.actions';
import { Component, OnInit, OnDestroy, ComponentRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UserActions } from '../../../actionHandlers/user.actions';
import { LoginRequest } from '../../../models/loginRequest';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

    private appStateSubscription: Subscription;
    public loginForm: FormGroup;
    public loginRequest: LoginRequest = new LoginRequest();

    constructor(
        private _appStateActions: AppStateActions,
        private _userActions: UserActions,
        private _fb: FormBuilder
    ) { }

    public ngOnInit() {
        this.setUpLoginForm();
    }
    public ngOnDestroy() { }

    public closeModal(): void {
        this._appStateActions.updateState({ 'modal.isLoginModalShown': false });
    }
    public Login(): void {
        this._userActions.logInUser(this.loginForm.value);
    }
    private setUpLoginForm(): void {
        this.loginForm = this._fb.group({
            userName: this.loginRequest.userName,
            password: this.loginRequest.password
        });
    }
}
