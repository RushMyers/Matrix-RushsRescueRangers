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
    private animalsFilter: object;

    constructor(
        private _store: Store<any>,
    ) { }

    public ngOnInit() {
        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            this.animals = animals;
            this.filteredAnimals = this.filterAnimals();
        });

        this.appStoreSubscription = this._store.select('appState').subscribe((appState) => {
            this.animalsFilter = appState['filter.animals'];
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

        if (this.animalsFilter === {}) {
            return this.animals;
        }
        this.filteredAnimals = this.animals;

        console.log(this.animalsFilter);
        // if (this.animalsFilter === 'Adopted' || this.animalsFilter === 'Not Adopted') {
        //     this.filteredAnimals = this.animals.filter((animal) => {
        //         return animal.isAdopted === (this.animalsFilter === 'Adopted' ? true : false);
        //     });
        // } else if (this.animalsFilter === 'Male' || this.animalsFilter === 'Female') {
        //     this.filteredAnimals = this.animals.filter((animal) => {
        //         return animal.gender === (this.animalsFilter === 'Male' ? 'M' : 'F');
        //     });

        // }
        return this.filteredAnimals;
    }
}
