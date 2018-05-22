import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Animal } from '../models/animal';
import { UPDATE_ANIMALS, UPDATE_ANIMAL, ADD_ANIMAL, EDIT_ANIMAL, DELETE_ANIMAL } from '../stores/animals.store';
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

    public getAnimal(animalId: number): void {
        this._http.get<Animal>(`${Constants.ApiBaseUrl}/animals/${animalId}`)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: UPDATE_ANIMAL, payload: res });
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    public createAnimal(animal: Animal): void {
        this._http.post<Animal>(`${Constants.ApiBaseUrl}/animals`, animal)
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
    public updateAnimal(animalInfo: Animal): void {
        this._http.put<Animal>(`${Constants.ApiBaseUrl}/animals/${animalInfo.id}`, animalInfo)
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
    public deleteAnimal(animal: Animal): void {
        this._http.delete(`${Constants.ApiBaseUrl}/animals/${animal.id}`)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: DELETE_ANIMAL, payload: animal.id });
                    this._router.navigate(['']);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            );
    }
}
