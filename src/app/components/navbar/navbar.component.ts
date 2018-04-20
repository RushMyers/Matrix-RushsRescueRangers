import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public filters = Constants.FILTERS_IS_ADOPTED;
  public isAdoptedFilter: string;
  public appStoreSubscription: any;

  constructor(
    private _router: Router,
    private _appStateActions: AppStateActions,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this.appStoreSubscription = this._store.select('appState').subscribe((appState) => {
      this.isAdoptedFilter = appState['filter.isAdopted'];
    });
  }

  public ngOnDestroy() {
    this.appStoreSubscription.unsubscribe();
  }

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  public onChange(filterValue: string) {
    this._appStateActions.updateState({ 'filter.isAdopted': filterValue });
  }

}
