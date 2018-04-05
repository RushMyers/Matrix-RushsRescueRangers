import { Action } from '@ngrx/store';
import { Animal } from '../models/animal';

// State
export type State = Array<Animal>;

// ActionTypes
export const
    UPDATE_ANIMALS = 'UPDATE_ANIMALS',
    CLEAR_ANIMALS = 'CLEAR_ANIMALS';

export class UpdateAnimalsAction implements Action {
    readonly type = UPDATE_ANIMALS;
    payload: Array<Animal>;
}
export class ClearanimalsAction implements Action {
    readonly type = CLEAR_ANIMALS;
}
export type Actions = UpdateAnimalsAction | ClearanimalsAction;

// Store/Reducer
export function animals(state: State = [], action: Actions): State {
    switch (action.type) {

        case UPDATE_ANIMALS:
            return action.payload;

        case CLEAR_ANIMALS:
            return [];

        default:
            return state;
    }
}
