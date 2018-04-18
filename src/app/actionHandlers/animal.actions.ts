import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Animal } from '../models/animal';
import { UPDATE_ANIMALS, ADD_ANIMAL, EDIT_ANIMAL, DELETE_ANIMAL } from '../stores/animals.store';
import * as Constants from '../constants/constants';

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
                (err: HttpErrorResponse) => {
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
        this._http.put<Animal>(`${Constants.ApiBaseUrl}/animals/${animalInfo.id}/edit`, animalInfo)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: EDIT_ANIMAL, payload: res });
                    this._router.navigate(['']);
                },
                (err) => {
                    alert(err);
                }
            );
    }
    public deleteAnimal(animal): void {
        this._http.delete<boolean>(`${Constants.ApiBaseUrl}/animals/${animal.id}`)
            .subscribe(
                (res) => {
                    if (res) {
                        this._store.dispatch({ type: DELETE_ANIMAL, payload: animal.id });
                        this._router.navigate(['']);
                    } else {
                        alert('Database Error');
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
