import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';
import { AnimalActions } from '../../actionHandlers/animal.actions';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>,
    private _animalActions: AnimalActions,
    private _fb: FormBuilder
  ) { }

  public selectedAnimal: Animal;
  private animals: Array<Animal>;
  private animalsSubscription;
  public editAnimalForm: FormGroup;

  ngOnInit() {
    const animalId = +this._route.snapshot.paramMap.get('id');

    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
      this.selectedAnimal = this.getAnimal(animalId);

      this.setupEditAnimalForm();
    });

    this.setupEditAnimalForm();
  }

  private setupEditAnimalForm(): void {
    if (this.selectedAnimal) {
      this.editAnimalForm = this._fb.group({
        name: this.selectedAnimal.name,
        species: this.selectedAnimal.species,
        imageUrl: this.selectedAnimal.imageUrl,
        description: this.selectedAnimal.description
      });
    } else {
      this.editAnimalForm = this._fb.group({
        name: '',
        species: '',
        imageUrl: '',
        description: ''
      });
    }
  }

  private getAnimal(id: number): Animal {
    return this.animals.find(animal => animal.id === id);
  }

  private updateAnimal(): void {
    const updatedAnimalData: Animal = {
      id: this.selectedAnimal.id,
      name: this.editAnimalForm.get('name').value,
      species: this.editAnimalForm.get('species').value,
      imageUrl: this.editAnimalForm.get('imageUrl').value,
      description: this.editAnimalForm.get('description').value
    };
    this._animalActions.updateAnimal(updatedAnimalData);
  }

}
