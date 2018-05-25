import { Action, ActionReducer } from '@ngrx/store';
import * as Constants from '../constants/constants';

export interface State {

    // Dropdowns
    'dropdown.isGenderFilterDropdownShown': boolean;
    'dropdown.isAdoptionFilterDropdownShown': boolean;
    'dropdown.isSpeciesFilterDropdownShown': boolean;

    // Modals
    'modal.isConfirmDeleteModalShown': boolean;
    'modal.isNewAdopterModalShown': boolean;
    'modal.isSignUpModalShown': boolean;
    'modal.isLoginModalShown': boolean;

    // Filters
    'filter.animals.gender': string;
    'filter.animals.adoptionStatus': string;
    'filter.animals.species': Array<string>;
}

const initialAppState: State = {

    // Dropdowns
    'dropdown.isGenderFilterDropdownShown': false,
    'dropdown.isAdoptionFilterDropdownShown': false,
    'dropdown.isSpeciesFilterDropdownShown': false,

    // Modals
    'modal.isNewAdopterModalShown': false,
    'modal.isConfirmDeleteModalShown': false,
    'modal.isSignUpModalShown': false,
    'modal.isLoginModalShown': false,

    // Filters
    'filter.animals.gender': Constants.FILTER_OPTIONS_ALL,
    'filter.animals.adoptionStatus': Constants.FILTER_OPTIONS_ALL,
    'filter.animals.species': []

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
