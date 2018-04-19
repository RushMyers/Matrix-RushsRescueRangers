import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';
import { AnimalActions } from '../../actionHandlers/animal.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  public selectedAnimal: Animal;
  private animals: Array<Animal>;
  public isNewAdopterModalVisible: boolean = false;
  private animalsSubscription;
  private appStateSubscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>,
    private _animalActions: AnimalActions,
    private _appStateActions: AppStateActions
  ) { }

  ngOnInit() {
    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
    });

    this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
      this.isNewAdopterModalVisible = appState['modal.isNewAdopterModalShown'];
    });

    this.getAnimal();
  }

  private getAnimal(): void {
    const id: number = +this._route.snapshot.paramMap.get('id');
    this.selectedAnimal = this.animals.find(animal => animal.id === id);
  }

  public adoptAnimal(): void {
    this._router.navigate([`animals/${this.selectedAnimal.id}/adoptions/new`]);
  }

  public editAnimal(): void {
    this._router.navigate([`animals/${this.selectedAnimal.id}/edit`]);
  }

  public deleteAnimal(): void {
    this._animalActions.deleteAnimal(this.selectedAnimal);
  }

  public showAllAnimals(): void {
    this._router.navigate(['']);
  }

  public showNewAdopterModal(): void {
    this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': true });
  }

  public hideNewAdopterModal(): void {
    this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': false });
  }
}
