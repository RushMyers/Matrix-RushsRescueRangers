import { Component, OnInit } from '@angular/core';

import { Animal } from '../../models/animal';
import { AnimalActions } from '../../actionHandlers/animal.actions';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})

export class NewAnimalComponent implements OnInit {

  public newAnimal: Animal = new Animal();

  constructor(
    private _animalActions: AnimalActions
  ) { }

  // submitted = false;

  // onSubmit() { this.submitted = true; }

  public sexes = Constants.ANIMAL_SEXES;

  public createAnimal(): void {
    this._animalActions.createAnimal(this.newAnimal);
  }

  ngOnInit() {
  }

}
