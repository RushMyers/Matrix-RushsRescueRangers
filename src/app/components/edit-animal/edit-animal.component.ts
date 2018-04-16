import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    private _animalActions: AnimalActions
  ) { }

  public selectedAnimal: Animal;
  private animals: Array<Animal>;
  private animalsSubscription;
  public name: string;
  public species: string;
  public imageUrl: string;
  public description: string;

  ngOnInit() {
    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
    });

    const animalId = +this._route.snapshot.paramMap.get('id');
    this.selectedAnimal = this.getAnimal(animalId);

    this.name = this.selectedAnimal.name;
    this.species = this.selectedAnimal.species;
    this.imageUrl = this.selectedAnimal.imageUrl;
    this.description = this.selectedAnimal.description;
  }

  private getAnimal(id: number): Animal {
    return this.animals.find(animal => animal.id === id);
  }

  private updateAnimal(): void {
    const updatedAnimalData: Animal = {
      id: this.selectedAnimal.id, name: this.name, species: this.species,
      imageUrl: this.imageUrl, description: this.description
    };
    this._animalActions.updateAnimal(updatedAnimalData);
  }

}
