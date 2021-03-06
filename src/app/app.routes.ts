import { Routes } from '@angular/router';

import { AdoptionComponent } from './components/adoption/adoption.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';
import { EditAnimalComponent } from './components/edit-animal/edit-animal.component';
import { NewAnimalComponent } from './components/new-animal/new-animal.component';
import { HomeComponent } from './components/home/home.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animal/:id', component: AnimalDetailComponent },
    { path: 'animals/new', component: NewAnimalComponent },
    { path: 'animals/:id/edit', component: EditAnimalComponent },
    { path: 'animals/:id/adoptions/new', component: AdoptionComponent },
    { path: 'users/:id', component: UserAccountComponent }
];
