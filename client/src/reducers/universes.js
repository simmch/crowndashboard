import {
    GET_UNIVERSES
} from '../actiontypes/index';

const initialState = {
    universes: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_UNIVERSES:
            return {...state, universes: payload, loading: false}
        default:
            return initialState;
    }
}