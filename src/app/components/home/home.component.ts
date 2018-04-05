import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Animal } from '../../models/animal';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public animals: Array<Animal>;
    private animalsSubscription: any;

    constructor(private _store: Store<any>) { }

    ngOnInit() {
        this.animalsSubscription = this._store.select('animals').subscribe((animals: Array<Animal>) => {
            this.animals = animals;
        });
    }
}
