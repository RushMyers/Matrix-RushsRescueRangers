import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';
import * as Constants from '../../constants/constants';

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
    private animalsSpeciesFilter: Array<string> = [];
    private currentFilters: Array<any>;
    public animals: Array<Animal>;
    public filteredAnimals: Array<Animal>;

    constructor(
        private _store: Store<any>
    ) { }

    public ngOnInit() {

        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            if (animals.length) {
                this.animals = animals;
                this.filterAnimals(this.animals);
            }
        });

        this.appStoreSubscription = this._store.select('appState').subscribe((appState) => {
            this.animalsGenderFilter = appState['filter.animals.gender'];
            this.animalsAdoptionFilter = appState['filter.animals.adoptionStatus'];
            this.animalsSpeciesFilter = appState['filter.animals.species'];

            this.filterAnimals(this.animals);
        });
    }

    public ngOnDestroy() {
        this.animalsSubscription.unsubscribe();
        this.appStoreSubscription.unsubscribe();
    }

    private filterAnimals(animals: Array<Animal>): Array<Animal> {
        this.filteredAnimals = animals;

        if (this.animalsGenderFilter && this.animalsGenderFilter !== Constants.FILTER_OPTIONS_ALL) {
            this.applyGenderFilter();
        }

        if (this.animalsAdoptionFilter && this.animalsAdoptionFilter !== Constants.FILTER_OPTIONS_ALL) {
            this.applyAdoptionFilter();
        }

        if (this.animalsSpeciesFilter.length) {
            this.applySpeciesFilter();
        }
        return this.filteredAnimals;
    }

    private applyGenderFilter() {
        this.filteredAnimals = this.filteredAnimals.filter((animal) => {
            return animal.gender === this.animalsGenderFilter.toUpperCase();
        });
    }

    private applyAdoptionFilter() {
        this.filteredAnimals = this.filteredAnimals.filter((animal) => {
            return animal.isAdopted === (this.animalsAdoptionFilter === 'adopted') ? true : false;
        });
    }

    private applySpeciesFilter() {
        this.filteredAnimals = this.filteredAnimals.filter((animal) => {
            return this.animalsSpeciesFilter.includes(animal.species.toLowerCase());
        });
    }
}
