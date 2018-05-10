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
    private animalsFilter: any;
    private animalsGenderFilter: string;
    private animalsAdoptionFilter: boolean;
    private animalsSpeciesFilter: string;
    private currentFilters: Array<any>;

    constructor(
        private _store: Store<any>,
    ) { }

    public ngOnInit() {

        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            if (animals.length > 0) {
                this.animals = animals;
                console.log('In ngOnInit', this.animals);
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
        if (!this.filteredAnimals) {
            this.filteredAnimals = this.animals;
        }

        console.log('FilteredAnimalsMethod - filteredAnimals:', this.filteredAnimals);
        console.log('FilteredAnimalsMethod - animals', this.animals);
        if (this.animalsGenderFilter) {
            this.filteredAnimals = this.filteredAnimals.filter((animal) => {
                return animal.gender === this.animalsGenderFilter.toUpperCase();
            });
        }
        if (this.animalsAdoptionFilter) {
            this.filteredAnimals = this.filteredAnimals.filter((animal) => {
                console.log(`Animal.isAdopted: ${animal.isAdopted}`, `Filter value: ${this.animalsAdoptionFilter}`);
                return animal.isAdopted === this.animalsAdoptionFilter;
            });
        }
        if (this.animalsSpeciesFilter) {
            this.filteredAnimals = this.filteredAnimals.filter((animal) => {
                return animal.species.toLowerCase() === this.animalsSpeciesFilter;
            });
        }
        return this.filteredAnimals;
    }
}
