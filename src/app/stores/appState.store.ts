import { Action, ActionReducer } from '@ngrx/store';
import * as Constants from '../constants/constants';

export interface State {

    // Dropdowns
    'dropdown.isAnimalFilterDropdownShown': boolean;

    // Modals
    'modal.isNewAdopterModalShown': boolean;
    'modal.isConfirmDeleteModalShown': boolean;

    // Filters
    // 'filter.animals': Array<string>;
    'filter.animals': object;

}

const initialAppState: State = {

    // Dropdowns
    'dropdown.isAnimalFilterDropdownShown': false,

    // Modals
    'modal.isNewAdopterModalShown': false,
    'modal.isConfirmDeleteModalShown': false,

    // Filters
    // 'filter.animals': Constants.FILTERS,
    'filter.animals': {}

};

export const UPDATE_APP_STATE = 'UPDATE_APP_STATE';

export class UpdateAppStateAction implements Action {
    readonly type = UPDATE_APP_STATE;
    public payload: {};
}

export type Actions = UpdateAppStateAction;

// Reducer
export function appState(state: State = initialAppState, action: Actions): State {
    switch (action.type) {
        case UPDATE_APP_STATE:
            const newState = Object.assign({}, state);
            Object.keys(action.payload).map((prop) => {
                // only update known properties, to catch errors
                if (prop in state) {
                    const newValue = action.payload[prop];
                    newState[prop] = newValue;
                } else {
                    console.error(`invalid property [${prop}] passed into AppState-reducer`);
                }
            });
            return newState;

        default:
            return state;

    }
}
