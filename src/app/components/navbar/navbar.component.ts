import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// import { AppStateActions } from '../../actionHandlers/appState.actions';
// import { Animal } from '../../models/animal';
// import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {
  // public filterOptionsGender: Array<string>;
  // public filterOptionsAdoptionStatus: Array<string>;
  // public filterOptionsSpecies: Array<string>;
  // public appStateSubscription: any;
  // public isAdoptionFilterDropdownShown: boolean = false;
  // public isGenderFilterDropdownShown: boolean = false;
  // public isSpeciesFilterDropdownShown: boolean = false;
  // private currentGenderFilter: string;
  // private currentAdoptionFilter: string;
  // private currentSpeciesFilter: string;
  // private animals: Array<Animal>;
  // private animalsSubscription: any;

  constructor(
    private _router: Router,
    // private _appStateActions: AppStateActions,
    // private _store: Store<any>
  ) { }

  public ngOnInit() {
    // this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
    // this.isAdoptionFilterDropdownShown = appState['dropdown.isAdoptionFilterDropdownShown'];
    // this.isSpeciesFilterDropdownShown = appState['dropdown.isSpeciesFilterDropdownShown'];
    // this.isGenderFilterDropdownShown = appState['dropdown.isGenderFilterDropdownShown'];

    // this.currentGenderFilter = appState['filter.animals.gender'];
    // this.currentAdoptionFilter = appState['filter.animals.adoptionStatus'];
    // this.currentSpeciesFilter = appState['filter.animals.species'];
    // });

    // this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
    //   this.animals = animals;
    // this.updateFilterOptions();
    // });
  }

  // private updateFilterOptions(): void {

  //   this.filterOptionsGender = [Constants.FILTER_OPTIONS_ALL];
  //   this.filterOptionsAdoptionStatus = [
  //     Constants.FILTER_OPTIONS_ALL,
  //     Constants.FILTER_OPTIONS_ADOPTED,
  //     Constants.FILTER_OPTIONS_NOT_ADOPTED
  //   ];
  //   this.filterOptionsSpecies = [Constants.FILTER_OPTIONS_ALL];

  //   this.animals.forEach((animal) => {
  //     if (!this.filterOptionsGender.includes(animal.gender.toLowerCase())) {
  //       this.filterOptionsGender.push(animal.gender.toLowerCase());
  //     }

  //     if (!this.filterOptionsSpecies.includes(animal.species.toLowerCase())) {
  //       this.filterOptionsSpecies.push(animal.species.toLowerCase());
  //     }
  //   });
  // }

  public ngOnDestroy() {
    // this.appStateSubscription.unsubscribe();
  }

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  // public toggleGenderDropdown(): void {
  //   const dropdownUpdate = this.isGenderFilterDropdownShown ?
  //     { 'dropdown.isGenderFilterDropdownShown': false } :
  //     { 'dropdown.isGenderFilterDropdownShown': true };

  //   this._appStateActions.updateState(dropdownUpdate);
  // }

  // public toggleAdoptionDropdown(): void {
  //   const dropdownUpdate = this.isAdoptionFilterDropdownShown ?
  //     { 'dropdown.isAdoptionFilterDropdownShown': false } :
  //     { 'dropdown.isAdoptionFilterDropdownShown': true };

  //   this._appStateActions.updateState(dropdownUpdate);
  // }

  // public toggleSpeciesDropdown(): void {
  //   const dropdownUpdate = this.isSpeciesFilterDropdownShown ?
  //     { 'dropdown.isSpeciesFilterDropdownShown': false } :
  //     { 'dropdown.isSpeciesFilterDropdownShown': true };

  //   this._appStateActions.updateState(dropdownUpdate);
  // }

  // public applyGenderFilter(filter): void {
  //   this._appStateActions.updateState({ 'filter.animals.gender': filter });
  // }

  // public applyAdoptionFilter(filter): void {
  //   this._appStateActions.updateState({ 'filter.animals.adoptionStatus': filter });
  // }

  // public applySpeciesFilter(filter): void {
  //   this._appStateActions.updateState({ 'filter.animals.species': filter });
  // }

  // public isGenderFilterSelected(filter) {
  //   return this.currentGenderFilter === filter;
  // }

  // public isAdoptionFilterSelected(filter) {
  //   return this.currentAdoptionFilter === filter;
  // }

  // public isSpeciesFilterSelected(filter) {
  //   return this.currentSpeciesFilter === filter;
  // }
}
