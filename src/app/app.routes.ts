import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AnimalShowComponent } from './components/animal-show/animal-show.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animal/:id', component: AnimalShowComponent }
];
