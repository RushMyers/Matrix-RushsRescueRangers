import { Routes } from '@angular/router';

import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';
import { HomeComponent } from './components/home/home.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animal/:id', component: AnimalDetailComponent }
];
