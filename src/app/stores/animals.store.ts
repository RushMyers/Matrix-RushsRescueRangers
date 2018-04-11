import { Action } from '@ngrx/store';

import { Animal } from '../models/animal';
import { makeClone } from '../helpers/utilities';

// State
export type State = Array<Animal>;

// ActionTypes
export const
    UPDATE_ANIMALS = 'UPDATE_ANIMALS',
    CLEAR_ANIMALS = 'CLEAR_ANIMALS',
    ADD_ANIMAL = 'ADD_ANIMAL',
    EDIT_ANIMAL = 'EDIT_ANIMAL',
    DELETE_ANIMAL = 'DELETE_ANIMAL';

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
export class EditAnimalAction implements Action {
    readonly type = EDIT_ANIMAL;
    payload: Animal;
}
export class DeleteAnimalAction implements Action {
    readonly type = DELETE_ANIMAL;
    payload: number;
}
export type Actions = UpdateAnimalsAction | ClearanimalsAction | AddAnimalAction | EditAnimalAction | DeleteAnimalAction;

// Store/Reducer
export function animals(state: State = [], action: Actions): State {
    let newState: State;

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

        case EDIT_ANIMAL:
            newState = makeClone(state);
            const animalIndex = newState.findIndex(animal => animal.id === action.payload.id);
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
