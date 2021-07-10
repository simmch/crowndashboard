import {
    GET_SESSIONS
} from '../actiontypes/index';

const initialState = {
    sessions: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_SESSIONS:
            return {...state, sessions: payload, loading: false}
        default:
            return initialState;
    }
}