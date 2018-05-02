import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Adopter } from '../models/adopter';
import { AdoptionObject } from '../models/adoptionObject';
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

    public createAdoption(adoptionObject): void {
        this._http.post<Animal>(`${Constants.ApiBaseUrl}/adoptions`, { adoptionObject })
            .subscribe(
                (res) => {
                    this.updateAnimal(res);
                    this._router.navigate(['/animals/adoptionObject.animal.id']);
                },
                (err) => {
                    console.log(err);
                }

            );
    }
    private updateAnimal(animal: Animal): void {
        this._animalActions.updateAnimal(animal);
    }
}
