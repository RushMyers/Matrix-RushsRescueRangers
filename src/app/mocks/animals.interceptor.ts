import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Animal } from '../models/animal';

@Injectable()
export class MockAnimalInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET' && req.url === `${Constants.ApiBaseUrl}/animals`) {
            const allAnimalsResponse = this.getAllAnimals();
            const response = new HttpResponse({
                body: allAnimalsResponse
            });
            return Observable.of(response);
        }
        return next.handle(req);
    }

    private getAllAnimals(): Array<Animal> {
        const allAnimals = [
            { name: 'Fluffy', species: 'Dog', imageUrl: 'https://i.imgur.com/hQYrLMg.jpg' },
            { name: 'Pickles', species: 'Cat', imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.fPn2N7rRGFXN40a6P4zdsQHaFj&pid=15.1&f=1' },
            { name: 'Trigger', species: 'Horse', imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.GXcxaB9lFJwEixLfIKYnHgHaEo&pid=15.1&f=1' },
            { name: 'Chorky', species: 'Pig', imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.8dvgkNHAa48Rzqb9s17KbAHaE6&pid=15.1&f=1' },
            { name: 'Brenda', species: 'Dog', imageUrl: 'https://tse3.mm.bing.net/th?id=OIP._pr6CLQpzK63jX2pyo6ecQHaFj&pid=15.1&f=1' },
            { name: 'Henry', species: 'Dog', imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.zruah6Jdcz5FCcbwGeabxQHaHa&pid=15.1&f=1' },
            { name: 'Cathy', species: 'Cat', imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.T6umakCG1lpkq3MOwTe-gQHaFj&pid=15.1&f=1' }

        ];
        return allAnimals;
    }
}
