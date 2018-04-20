import { Action, ActionReducer } from '@ngrx/store';
import * as Constants from '../constants/constants';

export interface State {
    // Modals
    'modal.isNewAdopterModalShown': boolean;

    // Filters
    'filter.isIsAdoptedFilterApplied': boolean;
    'filter.isNotAdoptedFilterApplied': boolean;
}

const initialAppState: State = {

    // Modals
    'modal.isNewAdopterModalShown': false,

    // Filters
    'filter.isIsAdoptedFilterApplied': false,
    'filter.isNotAdoptedFilterApplied': false
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
