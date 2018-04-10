import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Animal } from '../models/animal';
import * as Constants from '../constants/constants';
import { UPDATE_ANIMALS, ADD_ANIMAL } from '../stores/animals.store';

@Injectable()
export class AnimalActions {

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _store: Store<any>
    ) { }

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
    public createAnimal(animal: Animal): void {

        this._http.post<Animal>(`${Constants.ApiBaseUrl}/animals/new`, animal)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: ADD_ANIMAL, payload: res });
                    this._router.navigate(['']);
                },
                (err) => {
                    alert(err);
                }
            );
    }
    public updateAnimal(animalInfo): void {
        console.log(animalInfo);
    }
}

