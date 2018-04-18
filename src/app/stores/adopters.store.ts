import { Action } from '@ngrx/store';

import { Adopter } from '../models/adopter';
import { makeClone } from '../helpers/utilities';

export type State = Array<Adopter>;

export const
    UPDATE_ADOPTERS = 'UPDATE_ADOPTERS',
    CLEAR_ADOPTERS = 'CLEAR_ADOPTERS',
    ADD_ADOPTER = 'ADD_ADOPTER',
    EDIT_ADOPTER = 'EDIT_ADOPTER',
    DELETE_ADOPTER = 'DELETE_ADOPTER';

export class UpdateAdoptersAction implements Action {
    readonly type = UPDATE_ADOPTERS;
    payload: Array<Adopter>;
}
export class ClearAdoptersAction implements Action {
    readonly type = CLEAR_ADOPTERS;
}
export class AddAdopterAction implements Action {
    readonly type = ADD_ADOPTER;
    payload: Adopter;
}
export class EditAdopterAction implements Action {
    readonly type = EDIT_ADOPTER;
    payload: Adopter;
}
export class DeleteAdopterAction implements Action {
    readonly type = DELETE_ADOPTER;
    payload: number;
}

export type Actions = UpdateAdoptersAction | AddAdopterAction | EditAdopterAction | DeleteAdopterAction;

export function adopters(state: State = [], action: Actions): State {
    let newState: State;

    switch (action.type) {

        case UPDATE_ADOPTERS:
            return action.payload;

        case ADD_ADOPTER:
            const newAdopter: Adopter = action.payload;
            return [...state, newAdopter];

        case EDIT_ADOPTER:
            newState = makeClone(state);
            const adopterIndex = newState.findIndex(adopter => adopter.id === action.payload.id);
            newState[adopterIndex] = action.payload;
            return newState;

        default:
            return state;
    }
}
