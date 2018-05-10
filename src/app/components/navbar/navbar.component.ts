import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import { Animal } from '../../models/animal';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // public filterOptionTypes = Constants.FILTERS;
  // public isAdoptedFilter: string;
  public filterOptionsGender: Array<string>;
  public filterOptionsAdoptionStatus: Array<boolean>;
  public filterOptionsSpecies: Array<string>;
  public appStateSubscription: any;
  public isAdoptionFilterDropdownShown: boolean = false;
  public isGenderFilterDropdownShown: boolean = false;
  public isSpeciesFilterDropdownShown: boolean = false;
  private animals: Array<Animal>;
  private animalsSubscription: any;

  constructor(
    private _router: Router,
    private _appStateActions: AppStateActions,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
      this.isAdoptionFilterDropdownShown = appState['dropdown.isAdoptionFilterDropdownShown'];
      this.isSpeciesFilterDropdownShown = appState['dropdown.isSpeciesFilterDropdownShown'];
      this.isGenderFilterDropdownShown = appState['dropdown.isGenderFilterDropdownShown'];
    });

    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
      this.updateFilterOptions();
    });
  }

  private updateFilterOptions(): void {

    this.filterOptionsGender = [];
    this.filterOptionsAdoptionStatus = [];
    this.filterOptionsSpecies = [];

    this.animals.forEach((animal) => {
      if (!this.filterOptionsGender.includes(animal.gender.toLowerCase())) {
        this.filterOptionsGender.push(animal.gender.toLowerCase());
      }
      if (!this.filterOptionsAdoptionStatus.includes(animal.isAdopted)) {
        this.filterOptionsAdoptionStatus.push(animal.isAdopted);
      }
      if (!this.filterOptionsSpecies.includes(animal.species.toLowerCase())) {
        this.filterOptionsSpecies.push(animal.species.toLowerCase());
      }
    });
  }

  public ngOnDestroy() {
    this.appStateSubscription.unsubscribe();
  }

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  public toggleGenderDropdown(): void {
    const dropdownUpdate = this.isGenderFilterDropdownShown ?
      { 'dropdown.isGenderFilterDropdownShown': false } :
      { 'dropdown.isGenderFilterDropdownShown': true };

    this._appStateActions.updateState(dropdownUpdate);
  }

  public toggleAdoptionDropdown(): void {
    const dropdownUpdate = this.isAdoptionFilterDropdownShown ?
      { 'dropdown.isAdoptionFilterDropdownShown': false } :
      { 'dropdown.isAdoptionFilterDropdownShown': true };

    this._appStateActions.updateState(dropdownUpdate);
  }

  public toggleSpeciesDropdown(): void {
    const dropdownUpdate = this.isSpeciesFilterDropdownShown ?
      { 'dropdown.isSpeciesFilterDropdownShown': false } :
      { 'dropdown.isSpeciesFilterDropdownShown': true };

    this._appStateActions.updateState(dropdownUpdate);
  }

  public toggleGenderFilter(filter): void {
    this._appStateActions.updateState({ 'filter.animals.gender': filter });
  }

  public toggleAdoptionFilter(filter): void {
    this._appStateActions.updateState({ 'filter.animals.adoptionStatus': filter });
  }

  public toggleSpeciesFilter(filter): void {
    this._appStateActions.updateState({ 'filter.animals.species': filter });
  }

  // public toggleFilter(filterName: string, filterValue: string): void {
  //   // console.log(this.updateFilters(filterName, filterValue));

  //   this._appStateActions.updateState({ 'filter.animals': filterName });
  // }

  // public updateFilters(filterName: string, filterValue: string): any {
  //   return this.filterOptionTypes.map((filter, i) => {

  //     const updatedFilters = [];
  //     updatedFilters[i] = filter;

  //     if (filter.name === filterName) {
  //       updatedFilters[i].options[filterValue] = true;
  //     }
  //     return updatedFilters;
  //   });
  // }

}
