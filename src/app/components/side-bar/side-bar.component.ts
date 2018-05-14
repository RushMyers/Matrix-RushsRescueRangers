import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import { Animal } from '../../models/animal';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
  private animals: Array<Animal>;
  private animalsSubscription: any;
  private appStateSubscription: any;
  public currentGenderFilter: string;
  public currentAdoptionFilter: string;
  public currentSpeciesFilters: Array<string>;
  public filterOptionsGender: Array<string>;
  public filterOptionsAdoptionStatus: Array<string>;
  public filterOptionsSpecies: Array<string>;

  constructor(
    private _router: Router,
    private _appStateActions: AppStateActions,
    private _store: Store<any>
  ) { }

  ngOnInit() {
    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
      this.updateFilterOptions();
    });

    this.appStateSubscription = this._store.select('appState').subscribe((appState) => {

      this.currentGenderFilter = appState['filter.animals.gender'];
      this.currentAdoptionFilter = appState['filter.animals.adoptionStatus'];
      this.currentSpeciesFilters = appState['filter.animals.species'];
    });
  }

  private updateFilterOptions(): void {

    this.filterOptionsGender = [Constants.FILTER_OPTIONS_ALL];
    this.filterOptionsAdoptionStatus = [
      Constants.FILTER_OPTIONS_ALL,
      Constants.FILTER_OPTIONS_ADOPTED,
      Constants.FILTER_OPTIONS_NOT_ADOPTED
    ];
    this.filterOptionsSpecies = [];

    this.animals.forEach((animal) => {
      if (!this.filterOptionsGender.includes(animal.gender.toLowerCase())) {
        this.filterOptionsGender.push(animal.gender.toLowerCase());
      }

      if (!this.filterOptionsSpecies.includes(animal.species.toLowerCase())) {
        this.filterOptionsSpecies.push(animal.species.toLowerCase());
      }
    });
  }

  public applyGenderFilter(filter: string): void {
    this._appStateActions.updateState({ 'filter.animals.gender': filter });
  }

  public applyAdoptionFilter(filter: string): void {
    this._appStateActions.updateState({ 'filter.animals.adoptionStatus': filter });
  }

  public applySpeciesFilter(filter: string): void {
    this.updateCurrentSpeciesFilters(filter);
    this._appStateActions.updateState({ 'filter.animals.species': this.currentSpeciesFilters });
  }

  public updateCurrentSpeciesFilters(filter: string): void {
    if (this.isSpeciesFilterSelected(filter)) {
      this.currentSpeciesFilters = this.currentSpeciesFilters.filter((filterOption) => {
        return filterOption !== filter;
      });
    } else {
      this.currentSpeciesFilters.push(filter);
    }
  }

  public isSpeciesFilterSelected(filter) {
    return this.currentSpeciesFilters.includes(filter);
  }
}
