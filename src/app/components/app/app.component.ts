import { AnimalActions } from '../../actionHandlers/animal.actions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private _animalActions: AnimalActions
  ) { }

  public ngOnInit() {
    this._animalActions.getAllAnimals();
  }
}
