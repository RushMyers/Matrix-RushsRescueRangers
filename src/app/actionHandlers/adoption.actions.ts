import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Adopter } from '../models/adopter';
import { Animal } from '../models/animal';
import * as Constants from '../constants/constants';

@Injectable()
export class AdoptionActions {
    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _store: Store<any>
    ) { }

    public createAdoption(animal: Animal, adopter: Adopter) {
        this._http.post<Adopter>(`${Constants.ApiBaseUrl}/adoptions/new`, animal, adopter)
            .subscribe(
                (res) => {
                    // this._store.dispatch({ type: ADD_ADOPTION, payload: res });

                    this._router.navigate(['']);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
