import { Action } from '@ngrx/store';
import { Animal } from '../models/animal';

// State
export type State = Array<Animal>;

// ActionTypes
export const
    UPDATE_ANIMALS = 'UPDATE_ANIMALS',
    CLEAR_ANIMALS = 'CLEAR_ANIMALS',
    ADD_ANIMAL = 'ADD_ANIMAL';

export class UpdateAnimalsAction implements Action {
    readonly type = UPDATE_ANIMALS;
    payload: Array<Animal>;
}
export class ClearanimalsAction implements Action {
    readonly type = CLEAR_ANIMALS;
}
export class AddAnimalAction implements Action {
    readonly type = ADD_ANIMAL;
    payload: Animal;
}
export type Actions = UpdateAnimalsAction | ClearanimalsAction | AddAnimalAction;

// Store/Reducer
export function animals(state: State = [], action: Actions): State {
    switch (action.type) {

        case UPDATE_ANIMALS:
            return action.payload;

        case CLEAR_ANIMALS:
            return [];

        case ADD_ANIMAL:
            const animalIds = state.map((animal: Animal): number => animal.id).sort();
            const newId: number = animalIds[animalIds.length - 1] + 1;
            const newAnimal: Animal = {
                ...action.payload,
                id: newId
            };

            return [...state, newAnimal];

        default:
            return state;
    }
}
