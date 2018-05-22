import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateActions } from '../../../actionHandlers/appState.actions';
import { UserActions } from '../../../actionHandlers/user.actions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-sign-up-modal',
    templateUrl: './sign-up-modal.component.html',
    styleUrls: ['./sign-up-modal.component.css']
})

export class SignUpModalComponent implements OnInit, OnDestroy {

    public userForm = new FormGroup({
        name: new FormControl(),
        userName: new FormControl(),
        password: new FormControl(),
        phoneNo: new FormControl(),
        email: new FormControl()
    });

    constructor(
        private _appStateActions: AppStateActions,
        private _userActions: UserActions
    ) { }

    public ngOnInit() {
    }
    public ngOnDestroy() {
    }

    public createNewUser(): void {
        this._userActions.createUser(this.userForm.value);
    }
    public closeSignUpModal(): void {
        this._appStateActions.updateState({
            'modal.isSignUpModalShown': false
        });
    }
}
