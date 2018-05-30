import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppStateActions } from './appState.actions';
import { User } from '../models/user';
import { ADD_USER } from '../stores/users.store';
import * as Constants from '../constants/constants';
import { LoginRequest } from '../models/loginRequest';

@Injectable()
export class UserActions {

    constructor(
        private _appStateActions: AppStateActions,
        private _http: HttpClient,
        private _router: Router,
        private _store: Store<any>
    ) { }

    public createUser(user: User): void {
        this._http.post<User>(`${Constants.ApiBaseUrl}/Users`, user)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: ADD_USER, payload: res });
                    this._appStateActions.updateState({ 'modal.isSignUpModalShown': false });
                    this._router.navigate(['']);
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    public logInUser(loginRequest: LoginRequest) {
        this._http.post<LoginRequest>(`${Constants.ApiBaseUrl}/Users/Login`, loginRequest)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
