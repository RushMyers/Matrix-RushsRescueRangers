import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    private _router: Router,
    // private _appStateActions: AppStateActions,
    // private _store: Store<any>
  ) { }

  public ngOnInit() {

  }
  public ngOnDestroy() {
  }

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  public allAnimals(): void {
    this._router.navigate(['']);
  }
}
