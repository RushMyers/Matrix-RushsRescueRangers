import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Adopter } from '../models/adopter';
import { AdoptionActions } from '../actionHandlers/adoption.actions';
import { Animal } from '../models/animal';
import { UPDATE_ADOPTERS, ADD_ADOPTER, CLEAR_ADOPTERS, EDIT_ADOPTER, DELETE_ADOPTER } from '../stores/adopters.store';
import * as Constants from '../constants/constants';

@Injectable()
export class AdopterActions {
    constructor(
        private _adoptionActions: AdoptionActions,
        private _http: HttpClient,
        private _router: Router,
        private _store: Store<any>
    ) { }

    // public createAdopter(animal: Animal, adopter: Adopter): void {

    //     this._http.post<Adopter>(`${Constants.ApiBaseUrl}/adopters`, adopter)
    //         .subscribe(
    //             (res) => {
    //                 this._store.dispatch({ type: ADD_ADOPTER, payload: res });
    //                 this.createAdoption(animal, res);
    //                 this._router.navigate(['']);
    //             },
    //             (err) => {
    //                 console.log(err);
    //             }
    //         );
    // }

    public updateAdopter(adopterInfo: Adopter): void {
        this._http.put<Adopter>(`${Constants.ApiBaseUrl}/adopters/${adopterInfo.id}/edit`, adopterInfo)
            .subscribe(
                (res) => {
                    this._store.dispatch({ type: EDIT_ADOPTER, payload: res });
                    this._router.navigate(['']);
                },
                (err) => {
                    alert(err);
                }
            );
    }
    public deleteAnimal(adopter: Adopter): void {
        this._http.delete<boolean>(`${Constants.ApiBaseUrl}/adopters/${adopter.id}`)
            .subscribe(
                (res) => {
                    if (res) {
                        this._store.dispatch({ type: DELETE_ADOPTER, payload: adopter.id });
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
