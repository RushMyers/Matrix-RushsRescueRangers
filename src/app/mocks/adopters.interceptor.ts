import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Adopter } from '../models/adopter';
import { Store } from '@ngrx/store';


@Injectable()
export class MockAdopterInterceptor implements HttpInterceptor {
    constructor(
        private _store: Store<any>,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method === 'POST' && req.url === `${Constants.ApiBaseUrl}/adopters/new`) {
            const newAdopter: Adopter = req.body;
            const response = new HttpResponse({
                body: newAdopter
            });
            return Observable.of(response);
        }
        if (req.method === 'PUT' && req.url === `${Constants.ApiBaseUrl}/adopters/${req.body.id}/edit`) {
            const updatedAdopter: Adopter = req.body;
            const response = new HttpResponse({
                body: updatedAdopter
            });
            return Observable.of(response);
        }
        if (req.method === 'DELETE' && req.url.substring(0, Constants.ApiBaseUrl.length + 9)) {
            const currentAdopters: Array<Adopter> = this.getCurrentAdopters();
            const adopterId: number = +req.url.substring(Constants.ApiBaseUrl.length + 9);

            let response: HttpResponse<boolean>;
            if (currentAdopters.find(adopter => adopter.id === adopterId)) {
                response = new HttpResponse({
                    body: true
                });
            } else {
                response = new HttpResponse({
                    body: false
                });
            }
            return Observable.of(response);
        }

        return next.handle(req);
    }

    private getCurrentAdopters(): Array<Adopter> {
        let currentAdopters = [];
        this._store.select('adopters').subscribe((adopters: Array<Adopter>) => {
            if (adopters) {
                currentAdopters = adopters;
            }
        });

        return currentAdopters;
    }
}
