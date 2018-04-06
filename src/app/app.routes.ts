import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animal/:id', component: AnimalDetailComponent }
];
