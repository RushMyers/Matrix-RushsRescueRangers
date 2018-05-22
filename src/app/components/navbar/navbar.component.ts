import { AppStateActions } from '../../actionHandlers/appState.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StateObservable } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {

  private appStateSubscription: Subscription;
  public _isSignUpModalShown: boolean;

  constructor(
    private _router: Router,
    private _appStateActions: AppStateActions,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
      this._isSignUpModalShown = appState['modal.isSignUpModalShown'];
    });
  }
  public ngOnDestroy() {
  }

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  public allAnimals(): void {
    this._router.navigate(['']);
  }

  public signUp(): void {
    this._appStateActions.updateState({ 'modal.isSignUpModalShown': true });
  }
}
