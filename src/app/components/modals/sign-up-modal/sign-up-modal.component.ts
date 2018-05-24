import { Component, OnInit, OnDestroy, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { AppStateActions } from '../../../actionHandlers/appState.actions';
import { UserActions } from '../../../actionHandlers/user.actions';
import { FormGroup, FormBuilder, FormControl, Form, Validators, ValidatorFn } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
    selector: 'app-sign-up-modal',
    templateUrl: './sign-up-modal.component.html',
    styleUrls: ['./sign-up-modal.component.css']
})

export class SignUpModalComponent implements OnInit, OnDestroy {

    public userForm: FormGroup;
    private newUser: User;

    constructor(
        private _appStateActions: AppStateActions,
        private _userActions: UserActions,
        private _fb: FormBuilder
    ) { }

    public ngOnInit() {
        this.newUser = new User();
        this.setUpUserForm();
    }

    public ngOnDestroy() {
    }

    private createNewUser(): void {
        console.log(this.mapFormToUser(this.userForm, this.newUser));
        this._userActions.createUser(this.mapFormToUser(this.userForm, this.newUser));
    }

    private mapFormToUser(form: FormGroup, user: User): User {
        user.name = form.get('name').value;
        user.userName = form.get('userName').value;
        user.phoneNo = form.get('phoneNo').value;
        user.email = form.get('email').value;
        user.password = form.get('password').value;
        return user;
    }

    public closeSignUpModal(): void {
        this._appStateActions.updateState({
            'modal.isSignUpModalShown': false
        });
    }

    private setUpUserForm(): void {
        this.userForm = this._fb.group({
            name: new FormControl(this.newUser.name, { validators: [Validators.required, Validators.minLength(2)] }),
            userName: new FormControl(this.newUser.userName, { validators: [Validators.required] }),
            phoneNo: new FormControl(this.newUser.phoneNo, { validators: [Validators.required] }),
            email: new FormControl(this.newUser.email, { validators: [Validators.required, Validators.email] }),
            password: new FormControl(this.newUser.password, { validators: [Validators.required] }),
            passwordConfirmation: new FormControl('', { validators: [Validators.required, this.passwordsMustMatch()] })
        });
    }

    private passwordsMustMatch(): ValidatorFn {
        return function (passwordConfirmationFormControl: FormControl): { passwordsMatch: { valid: boolean } } {
            if (!passwordConfirmationFormControl.root || !passwordConfirmationFormControl.root['controls']) {
                return null;
            }
            const passwordFormControl = passwordConfirmationFormControl.root.get('password');
            if (!passwordFormControl.valid) {
                return null;
            }
            if (passwordFormControl.value !== passwordConfirmationFormControl.value) {
                return {
                    passwordsMatch: {
                        valid: false
                    }
                };
            }
            return null;
        };
    }
}
