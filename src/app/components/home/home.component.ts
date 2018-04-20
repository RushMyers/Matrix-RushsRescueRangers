import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public animals: Array<Animal>;
    private animalsSubscription: any;
    private appStoreSubscription: any;
    private isIsAdoptedFilterApplied: boolean;
    private isNotAdoptedFilterApplied: boolean;

    constructor(
        private _store: Store<any>,
    ) { }

    private filterAnimals(animals): Array<Animal> {

        if (this.isIsAdoptedFilterApplied) {
            return animals.filter((animal) => {
                return animal.isAdopted;
            });
        }

        if (this.isNotAdoptedFilterApplied) {
            return animals.filter((animal) => {
                return animal.isAdopted === false;
            });
        }
        return animals;
    }

    ngOnInit() {
        console.log(this.filterAnimals(this.animals));
        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            this.animals = this.filterAnimals(animals);
        });

        this.appStoreSubscription = this._store.select('appState').subscribe((appState) => {
            this.isIsAdoptedFilterApplied = appState['filter.isIsAdoptedFilterApplied'];
            this.isNotAdoptedFilterApplied = appState['filter.isNotAdoptedFilterApplied'];
        });

    }
}
