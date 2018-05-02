import { Action } from '@ngrx/store';

import { Animal } from '../models/animal';
import { makeClone } from '../helpers/utilities';

// State
export type State = Array<Animal>;

// ActionTypes
export const
    UPDATE_ANIMALS = 'UPDATE_ANIMALS',
    UPDATE_ANIMAL = 'UPDATE_ANIMAL',
    CLEAR_ANIMALS = 'CLEAR_ANIMALS',
    ADD_ANIMAL = 'ADD_ANIMAL',
    EDIT_ANIMAL = 'EDIT_ANIMAL',
    DELETE_ANIMAL = 'DELETE_ANIMAL';

export class UpdateAnimalsAction implements Action {
    readonly type = UPDATE_ANIMALS;
    payload: Array<Animal>;
}
export class UpdateAnimalAction implements Action {
    readonly type = UPDATE_ANIMAL;
    payload: Animal;
}
export class ClearanimalsAction implements Action {
    readonly type = CLEAR_ANIMALS;
}
export class AddAnimalAction implements Action {
    readonly type = ADD_ANIMAL;
    payload: Animal;
}
export class EditAnimalAction implements Action {
    readonly type = EDIT_ANIMAL;
    payload: Animal;
}
export class DeleteAnimalAction implements Action {
    readonly type = DELETE_ANIMAL;
    payload: number;
}
export type Actions = UpdateAnimalsAction | UpdateAnimalAction | ClearanimalsAction |
    AddAnimalAction | EditAnimalAction | DeleteAnimalAction;

// Store/Reducer
export function animals(state: State = [], action: Actions): State {
    let newState: State;
    let animalIndex: number;

    switch (action.type) {

        case UPDATE_ANIMALS:
            return action.payload;

        case UPDATE_ANIMAL:
            newState = makeClone(state);
            animalIndex = newState.findIndex(animal => animal.id === action.payload.id);
            newState[animalIndex] = action.payload;
            return newState;

        case CLEAR_ANIMALS:
            return [];

        case ADD_ANIMAL:

            const newAnimal: Animal = action.payload;

            return [...state, newAnimal];

        case EDIT_ANIMAL:
            newState = makeClone(state);
            animalIndex = newState.findIndex(animal => animal.id === action.payload.id);

            newState[animalIndex] = action.payload;
            return newState;

        case DELETE_ANIMAL:
            newState = makeClone(state);
            newState = newState.filter(animal => animal.id !== action.payload);
            return newState;

        default:
            return state;
    }
}
