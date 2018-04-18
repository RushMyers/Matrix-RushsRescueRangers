import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Adopter } from '../models/adopter';


@Injectable()
export class MockAdopterInterceptor implements HttpInterceptor {
    constructor(
    ) { }

    private allAdopters: Array<Adopter> = [];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        if (req.method === 'POST' && req.url === `${Constants.ApiBaseUrl}/adopters`) {

            const newAdopter: Adopter = {
                ...req.body,
                id: this.allAdopters.length + 1
            };
            this.allAdopters.push(newAdopter);
            const response = new HttpResponse({
                body: newAdopter
            });
            return Observable.of(response);
        }

        return next.handle(req);
    }
}
