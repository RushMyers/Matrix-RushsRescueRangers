import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Adopter } from '../models/adopter';
import { Animal } from '../models/animal';
import { AnimalActions } from '../actionHandlers/animal.actions';
import { ADD_ADOPTION } from '../stores/adoptions.store';
import * as Constants from '../constants/constants';

@Injectable()
export class AdoptionActions {
    constructor(
        private _animalActions: AnimalActions,
        private _http: HttpClient,
        private _router: Router,
        private _store: Store<any>
    ) { }

    public createAdoption(animal: Animal, adopter: Adopter): void {
        this._http.post<Adopter>(`${Constants.ApiBaseUrl}/adoptions`, { animal, adopter })
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: ADD_ADOPTION, payload: res });
                    this.updateAdoptedAnimal(animal);
                    this._router.navigate(['']);
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    private updateAdoptedAnimal(animal: Animal) {
        this._animalActions.updateAnimal(
            { ...animal, isAdopted: true }
        );
    }
}
