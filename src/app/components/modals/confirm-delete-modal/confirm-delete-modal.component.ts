import { Component, OnInit, Input } from '@angular/core';

import { Animal } from '../../../models/animal';
import { AnimalActions } from '../../../actionHandlers/animal.actions';
import { AppStateActions } from '../../../actionHandlers/appState.actions';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {

  @Input() animal;
  public currentAnimal: Animal;

  constructor(
    private _animalActions: AnimalActions,
    private _appStateActions: AppStateActions
  ) { }

  ngOnInit() {
    this.currentAnimal = this.animal;
  }

  public deleteAnimal(): void {
    this._animalActions.deleteAnimal(this.currentAnimal);
    this.closeModal();
  }

  public closeModal(): void {
    this._appStateActions.updateState({ 'modal.isConfirmDeleteModalShown': false });
  }

}
