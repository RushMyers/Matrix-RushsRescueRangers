import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public animals: Array<Animal> = [
        { name: 'fluffy', species: 'dog', imageUrl: 'https://i.imgur.com/hQYrLMg.jpg' },
        { name: 'pickles', species: 'cat', imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.fPn2N7rRGFXN40a6P4zdsQHaFj&pid=15.1&f=1' },
        { name: 'trigger', species: 'horse', imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.GXcxaB9lFJwEixLfIKYnHgHaEo&pid=15.1&f=1' },
    ];
    constructor() { }

    ngOnInit() { }
}
