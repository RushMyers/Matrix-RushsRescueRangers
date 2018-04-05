import * as Constants from '../constants/constants';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Animal } from '../models/animal';
import { Store } from '@ngrx/store';
import { UPDATE_ANIMALS } from '../stores/animals.store';
import { Injectable } from '@angular/core';

@Injectable()
export class AnimalActions {

    constructor(private _http: HttpClient,
        private _store: Store<any>) { }

    public getAllAnimals(): void {

        this._http.get<Array<Animal>>(`${Constants.ApiBaseUrl}/animals`)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: UPDATE_ANIMALS, payload: res });
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}

