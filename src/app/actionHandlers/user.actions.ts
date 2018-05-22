import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { User } from '../models/user';
import * as Constants from '../constants/constants';

@Injectable()
export class UserActions {

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _store: Store<any>
    ) { }

    public createUser(user: User): void {
        this._http.post<User>(`${Constants.ApiBaseUrl}/Users`, user)
            .subscribe(
                (res) => {
                    console.log(res);
                    // this._store.dispatch({ type})
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
