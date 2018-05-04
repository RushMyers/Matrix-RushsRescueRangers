import { Component, OnInit } from '@angular/core';

import { Animal } from '../../models/animal';
import { AnimalActions } from '../../actionHandlers/animal.actions';
import * as Constants from '../../constants/constants';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})

export class NewAnimalComponent implements OnInit {

  public newAnimal: Animal = new Animal();

  constructor(
    private _animalActions: AnimalActions,
    private _fb: FormBuilder
  ) { }

  public sexes = Constants.ANIMAL_SEXES;
  public newAnimalForm: FormGroup;

  public createAnimal(): void {
    this._animalActions.createAnimal(this.newAnimalForm.value);
  }

  ngOnInit() {
    this.setUpNewAnimalForm();
  }

  private setUpNewAnimalForm(): void {
    this.newAnimalForm = this._fb.group({
      name: this.newAnimal.name,
      species: this.newAnimal.species,
      gender: this.newAnimal.gender,
      imageUrl: this.newAnimal.imageUrl,
      description: this.newAnimal.description
    });
  }

}
