import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  @Input() public animal: Animal;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }
  public showAnimal(animalId: number): void {
    this._router.navigate(['animal', animalId]);
  }

}
