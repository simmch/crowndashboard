import {
    GET_MATCHES
} from '../actiontypes/index';

const initialState = {
    matches: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_MATCHES:
            return {...state, matches: payload, loading: false}
        default:
            return initialState;
    }
}