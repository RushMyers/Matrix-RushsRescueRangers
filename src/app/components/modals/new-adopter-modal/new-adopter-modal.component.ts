import { Component, EventEmitter, OnInit, Input } from '@angular/core';

import { Adopter } from '../../../models/adopter';
import { AdopterActions } from '../../../actionHandlers/adopter.actions';
import { AppStateActions } from '../../../actionHandlers/appState.actions';

@Component({
  selector: 'app-new-adopter-modal',
  templateUrl: './new-adopter-modal.component.html',
  styleUrls: ['./new-adopter-modal.component.css']
})

export class NewAdopterModalComponent implements OnInit {

  public newAdopter: Adopter = new Adopter();

  @Input() public onOk = new EventEmitter();
  @Input() public onCancel = new EventEmitter();

  constructor(
    private _adopterActions: AdopterActions,
    private _appStateActions: AppStateActions
  ) { }

  public createAdopter(): void {
    this._adopterActions.createAdopter(this.newAdopter);
    this.closeModal();
  }

  ngOnInit() {
  }

  public closeModal() {
    this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': false });
  }
}
