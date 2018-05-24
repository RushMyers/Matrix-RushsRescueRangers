import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AnimalDetailComponent implements OnInit, OnDestroy {

  public selectedAnimal: Animal;
  private animals: Array<Animal>;
  public isNewAdopterModalVisible: boolean = false;
  public isConfirmDeleteModalVisible: boolean = false;
  public isAnimalAvailable: boolean;
  private animalsSubscription;
  private appStateSubscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>,
    private _animalActions: AnimalActions,
    private _appStateActions: AppStateActions
  ) { }

  public ngOnInit() {

    this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
      this.animals = animals;
      this.getAnimal();
    });

    this.isAnimalAvailable = !this.selectedAnimal.isAdopted;

    this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
      this.isNewAdopterModalVisible = appState['modal.isNewAdopterModalShown'];
      this.isConfirmDeleteModalVisible = appState['modal.isConfirmDeleteModalShown'];
    });

  }

  public ngOnDestroy() {
    this.animalsSubscription.unsubscribe();
    this.appStateSubscription.unsubscribe();
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

  public showNewAdopterModal(): void {
    this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': true });
  }

  public hideNewAdopterModal(): void {
    this._appStateActions.updateState({ 'modal.isNewAdopterModalShown': false });
  }

  public showConfirmDeleteModal(): void {
    this._appStateActions.updateState({ 'modal.isConfirmDeleteModalShown': true });
  }

  public hideConfirmDeleteModal(): void {
    this._appStateActions.updateState({ 'modal.isConfirmDeleteModalShown': false });
  }
}
