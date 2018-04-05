import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-show',
  templateUrl: './animal-show.component.html',
  styleUrls: ['./animal-show.component.css']
})
export class AnimalShowComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>
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

  public showAllAnimals(): void {
    this._router.navigate(['']);
  }
}
