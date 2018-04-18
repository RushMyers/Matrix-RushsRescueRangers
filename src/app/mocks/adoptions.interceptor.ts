import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Adopter } from '../models/adopter';
import { Animal } from '../models/animal';
import { Adoption } from '../models/adoption';

@Injectable()
export class MockAdoptionIntercepter implements HttpInterceptor {
    constructor(

    ) { }

    private allAdoptions: Array<Adoption> = [];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method === 'POST' && req.url === `${Constants.ApiBaseUrl}/adoptions`) {

            const today = new Date;
            const newAdoption: Adoption = {
                id: this.allAdoptions.length + 1,
                adopterId: req.body.adopter.id,
                animalId: req.body.animal.id,
                date: today
            };
            this.allAdoptions.push(newAdoption);
            const response = new HttpResponse({
                body: newAdoption
            });
            return Observable.of(response);
        }

        return next.handle(req);
    }


}
