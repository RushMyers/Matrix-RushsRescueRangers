import { Component, EventEmitter, OnInit, Input } from '@angular/core';

import { Adopter } from '../../../models/adopter';
import { AdopterActions } from '../../../actionHandlers/adopter.actions';

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
    private _adopterActions: AdopterActions
  ) { }

  public createAdopter(): void {
    this._adopterActions.createAdopter(this.newAdopter);
  }

  ngOnInit() {
  }
  public ok() {
    this.onOk.emit();
  }
  public cancel() {
    this.onCancel.emit('');
  }
}
