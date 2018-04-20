import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
    public animals: Array<Animal>;
    private animalsSubscription: any;
    private appStoreSubscription: any;
    public filteredAnimals: Array<Animal>;
    private isAdoptedFilter: string;

    constructor(
        private _store: Store<any>,
    ) { }

    public ngOnInit() {
        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            this.animals = animals;
            this.filteredAnimals = this.filterAnimals();
        });

        this.appStoreSubscription = this._store.select('appState').subscribe((appState) => {
            this.isAdoptedFilter = appState['filter.isAdopted'];
            this.filteredAnimals = this.filterAnimals();
        });
    }

    public ngOnDestroy() {
        this.animalsSubscription.unsubscribe();
        this.appStoreSubscription.unsubscribe();
    }

    private filterAnimals(): Array<Animal> {
        if (!this.animals) {
            return [];
        }

        if (this.isAdoptedFilter === 'All') {
            return this.animals;
        }

        const filteredAnimals = this.animals.filter((animal) => {
            return animal.isAdopted === (this.isAdoptedFilter === 'Adopted' ? true : false);
        });
        return filteredAnimals;
    }
}
