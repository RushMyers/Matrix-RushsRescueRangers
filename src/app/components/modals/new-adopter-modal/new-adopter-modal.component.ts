import { Component, EventEmitter, OnInit, Input } from '@angular/core';

import { Adopter } from '../../../models/adopter';
import { Animal } from '../../../models/animal';
// import { AdopterActions } from '../../../actionHandlers/adopter.actions';
import { AdoptionActions } from '../../../actionHandlers/adoption.actions';
import { AppStateActions } from '../../../actionHandlers/appState.actions';

@Component({
  selector: 'app-new-adopter-modal',
  templateUrl: './new-adopter-modal.component.html',
  styleUrls: ['./new-adopter-modal.component.css']
})

export class NewAdopterModalComponent implements OnInit {

  @Input() animal;
  public newAdopter: Adopter = new Adopter();
  public currentAnimal: Animal;

  constructor(
    // private _adopterActions: AdopterActions,
    private _adoptionActions: AdoptionActions,
    private _appStateActions: AppStateActions
  ) { }

  // public createAdopter(): void {
  //   this._adopterActions.createAdopter(this.currentAnimal, this.newAdopter);
  //   this.closeModal();
  // }

  public createAdoption(): void {
    this._adoptionActions.createAdoption({ animal: this.currentAnimal, adopter: this.newAdopter });
  }

  ngOnInit() {
    this.currentAnimal = this.animal;
  }

  public closeModal(): void {
    this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': false });
  }
}
