import {
    GET_TEAMS
} from '../actiontypes/index';

const initialState = {
    teams: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_TEAMS:
            return {...state, teams: payload, loading: false}
        default:
            return initialState;
    }
}