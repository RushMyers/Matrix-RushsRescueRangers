import { Action } from '@ngrx/store';

import { User } from '../models/user';
import { makeClone } from '../helpers/utilities';

export type State = Array<User>;

// ActionTypes
export const
    ADD_USER = 'ADD_USER';

export class AddUserAction implements Action {
    readonly type = ADD_USER;
    payload: User;
}

export type Actions = AddUserAction;

export function users(state: State = [], action: Actions): State {

    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload];

        default:
            return state;
    }
}

