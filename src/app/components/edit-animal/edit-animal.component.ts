import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
    });
    this.getAnimal();
  }

  private getAnimal(): void {
    const id: number = +this._route.snapshot.paramMap.get('id');
    this.selectedAnimal = this.animals.find(animal => animal.id === id);
  }

  private updateAnimal(): void {
    this._animalActions.updateAnimal(this.selectedAnimal);
  }

}
