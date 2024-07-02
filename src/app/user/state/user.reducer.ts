import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from "../user";
import * as UserActions from "./user.actions"
// State for this Feature
export interface UserState {
    maskUserName: boolean,
    currentUser: User
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
}

// Feature Selector Function
const getMaskUserFeature = createFeatureSelector<UserState>('user');

export const getshowMaskChecked = createSelector(
    getMaskUserFeature,
    state => state.maskUserName
);

// State Selector
export const getCurrentUser = createSelector(
    getMaskUserFeature,
    state => state.currentUser
);

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.toggleMaskUser, (state): UserState => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        }
    }),
    on(UserActions.setCurrentUser, (state, actions): UserState => {
        return {
            ...state,
            currentUser: actions.user
        }
    })
)