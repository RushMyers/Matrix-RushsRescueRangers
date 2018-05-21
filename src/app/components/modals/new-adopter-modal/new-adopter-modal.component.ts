import { Component, EventEmitter, OnInit, Input } from '@angular/core';

import { Adopter } from '../../../models/adopter';
import { Animal } from '../../../models/animal';
import { AdoptionActions } from '../../../actionHandlers/adoption.actions';
import { AppStateActions } from '../../../actionHandlers/appState.actions';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-new-adopter-modal',
    templateUrl: './new-adopter-modal.component.html',
    styleUrls: ['./new-adopter-modal.component.css']
})

export class NewAdopterModalComponent implements OnInit {


    @Input() animal;
    public newAdopter: Adopter = new Adopter();
    public currentAnimal: Animal;

    public newAdopterForm: FormGroup;


    constructor(
        private _adoptionActions: AdoptionActions,
        private _appStateActions: AppStateActions,
        private _fb: FormBuilder
    ) { }


    public createAdoption(): void {
        this._adoptionActions.createAdoption({ animal: this.currentAnimal, adopter: this.newAdopterForm.value });
    }

    ngOnInit() {
        this.setUpNewAdopterForm();
        this.currentAnimal = this.animal;
    }


    private setUpNewAdopterForm(): void {
        this.newAdopterForm = this._fb.group({
            firstName: this.newAdopter.firstName,
            lastName: this.newAdopter.lastName,
            address: this.newAdopter.address,
            city: this.newAdopter.address,
            state: this.newAdopter.state,
            postalCode: this.newAdopter.postalCode,
            phoneNo: this.newAdopter.phoneNo
        });
    }

    public closeModal(): void {
        this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': false });
    }
}
