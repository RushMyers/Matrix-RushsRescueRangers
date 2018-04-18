import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Animal } from '../models/animal';
import { Store } from '@ngrx/store';

@Injectable()
export class MockAnimalInterceptor implements HttpInterceptor {
    constructor(
        private _store: Store<any>,
    ) { }

    public allAnimals: Array<Animal> = [
        {
            id: 1, name: 'Fluffy', species: 'Dog', imageUrl: 'https://i.imgur.com/eZwTsb6.jpg',
            gender: 'Male', description: 'Quis nostrum exercitationem ullam corporis suscipit laboriosam cosmos shores.'
        },
        {
            id: 2, name: 'Pickles', species: 'Cat', imageUrl: 'https://i.imgur.com/zItMO7k.jpg', gender: 'Male',
            description: 'Realm of the galaxies extraordinary claims require extraordinary evidence tingling of the spine inconspicuous'
        },
        {
            id: 3, name: 'Trigger', species: 'Horse', imageUrl: 'https://i.imgur.com/I7gvJ42.jpg', gender: 'Female',
            description: 'motes of rock and gas'
        },
        { id: 4, name: 'Chorky', species: 'Pig', imageUrl: 'https://i.imgur.com/qJ30HYJ.jpg' },
        { id: 5, name: 'Brenda', species: 'Dog', imageUrl: 'https://i.imgur.com/nTt8wvq.jpg' },
        { id: 6, name: 'Henry', species: 'Dog', imageUrl: 'https://i.imgur.com/5V21pDS.jpg' },
        { id: 7, name: 'Cathy', species: 'Cat', imageUrl: 'https://i.imgur.com/w6TFe5X.jpg' }
    ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method === 'GET' && req.url === `${Constants.ApiBaseUrl}/animals`) {
            const allAnimalsResponse = this.getAllAnimals();
            const response = new HttpResponse({
                body: allAnimalsResponse
            });
            return Observable.of(response);
        }

        if (req.method === 'POST' && req.url === `${Constants.ApiBaseUrl}/animals/new`) {
            const newAnimal: Animal = req.body;
            const response = new HttpResponse({
                body: newAnimal
            });
            this.allAnimals.push(newAnimal);
            return Observable.of(response);
        }

        if (req.method === 'PUT' && req.url === `${Constants.ApiBaseUrl}/animals/${req.body.id}/edit`) {
            const updatedAnimal: Animal = req.body;
            const response = new HttpResponse({
                body: updatedAnimal
            });
            return Observable.of(response);
        }

        if (req.method === 'DELETE' && req.url.substring(0, Constants.ApiBaseUrl.length + 9)) {
            const currentAnimals: Array<Animal> = this.getCurrentAnimals();
            const animalId: number = +req.url.substring(Constants.ApiBaseUrl.length + 9);

            let response: HttpResponse<boolean>;
            if (currentAnimals.find(animal => animal.id === animalId)) {
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

    private getAllAnimals(): Array<Animal> {
        return this.allAnimals;
    }

    private getCurrentAnimals(): Array<Animal> {
        let currentAnimals = [];
        this._store.select('animals').subscribe((animals: Array<Animal>) => {
            if (animals) {
                currentAnimals = animals;
            }
        });

        return currentAnimals;
    }
}
