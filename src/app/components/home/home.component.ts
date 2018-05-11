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
    private animalsSubscription: any;
    private appStoreSubscription: any;
    private animalsFilter: any;
    private animalsGenderFilter: string;
    private animalsAdoptionFilter: string;
    private animalsSpeciesFilter: string;
    private currentFilters: Array<any>;
    public animals: Array<Animal>;
    public filteredAnimals: Array<Animal>;

    constructor(
        private _store: Store<any>,
    ) { }

    public ngOnInit() {

        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            if (animals.length) {
                this.animals = animals;
                this.filterAnimals();
            }
        });

        this.appStoreSubscription = this._store.select('appState').subscribe((appState) => {
            this.animalsGenderFilter = appState['filter.animals.gender'];
            this.animalsAdoptionFilter = appState['filter.animals.adoptionStatus'];
            this.animalsSpeciesFilter = appState['filter.animals.species'];

            this.filterAnimals();
        });
    }

    public ngOnDestroy() {
        this.animalsSubscription.unsubscribe();
        this.appStoreSubscription.unsubscribe();
    }

    private filterAnimals(): Array<Animal> {
        this.filteredAnimals = this.animals;

        if (this.animalsGenderFilter && this.animalsGenderFilter !== 'all') {
            this.filteredAnimals = this.filteredAnimals.filter((animal) => {
                return animal.gender === this.animalsGenderFilter.toUpperCase();
            });
        }

        if (this.animalsAdoptionFilter && this.animalsAdoptionFilter !== 'all') {
            this.filteredAnimals = this.filteredAnimals.filter((animal) => {
                return animal.isAdopted === (this.animalsAdoptionFilter === 'adopted') ? true : false;
            });
        }

        if (this.animalsSpeciesFilter && this.animalsSpeciesFilter !== 'all') {
            this.filteredAnimals = this.filteredAnimals.filter((animal) => {
                return animal.species.toLowerCase() === this.animalsSpeciesFilter;
            });
        }
        return this.filteredAnimals;
    }
}
