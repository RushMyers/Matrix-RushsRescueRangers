import { AppStateActions } from '../../actionHandlers/appState.actions';
import { Component, OnInit, OnDestroy, ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

    private appStateSubscription: Subscription;

    constructor(
        private _appStateActions: AppStateActions,
    ) { }

    public ngOnInit() { }
    public ngOnDestroy() { }

    public closeModal() {
        this._appStateActions.updateState({ 'modal.isLoginModalShown': false });
    }
}
