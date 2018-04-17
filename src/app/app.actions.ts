import { AdopterActions } from './actionHandlers/adopter.actions';
import { AdoptionActions } from './actionHandlers/adoption.actions';
import { AnimalActions } from './actionHandlers/animal.actions';
import { AppStateActions } from './actionHandlers/appState.actions';

export const APP_ACTIONS = [
    AdopterActions,
    AdoptionActions,
    AnimalActions,
    AppStateActions
];
