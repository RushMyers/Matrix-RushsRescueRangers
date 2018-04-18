import { Action, Store } from '@ngrx/store';

import { Adoption } from '../models/adoption';
import { Adopter } from '../models/adopter';
import { Animal } from '../models/animal';
import { makeClone } from '../helpers/utilities';

export type State = Array<Adoption>;

export const
    ADD_ADOPTION = 'ADD_ADOPTION';

export class AddAdoptionAction implements Action {
    readonly type = ADD_ADOPTION;
    payload: Adoption;
}

export type Actions = AddAdoptionAction;

export function adoptions(state: State = [], action: Actions): State {

    switch (action.type) {

        case ADD_ADOPTION:
            const newAdoption: Adoption = action.payload;
            return [...state, newAdoption];

        default:
            return state;
    }
}
