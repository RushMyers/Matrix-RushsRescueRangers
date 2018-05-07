import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public filters = Constants.FILTERS;
  public isAdoptedFilter: string;
  public appStateSubscription: any;
  public isAnimalFilterDropdownShown: boolean = false;

  constructor(
    private _router: Router,
    private _appStateActions: AppStateActions,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
      this.isAdoptedFilter = appState['filter.animals'];
      this.isAnimalFilterDropdownShown = appState['dropdown.isAnimalFilterDropdownShown'];
    });
  }

  public ngOnDestroy() {
    this.appStateSubscription.unsubscribe();
  }

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  public toggleDropdown(): void {
    const dropdownUpdate = this.isAnimalFilterDropdownShown ?
      { 'dropdown.isAnimalFilterDropdownShown': false } :
      { 'dropdown.isAnimalFilterDropdownShown': true };

    this._appStateActions.updateState(dropdownUpdate);

  }

  public onChange(filterValue: string) {
    this._appStateActions.updateState({ 'filter.animals': filterValue });
  }

}
