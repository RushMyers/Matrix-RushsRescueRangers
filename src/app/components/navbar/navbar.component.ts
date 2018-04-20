import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _appStateActions: AppStateActions
  ) { }

  public filters = Constants.FILTERS;
  public selectedFilter: object = {};

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  public onChange(event) {

    const filter = event.filter;
    this._appStateActions.updateState(filter);
  }

  ngOnInit() {
  }
}
