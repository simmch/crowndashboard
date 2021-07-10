import {
    GET_BOSSES
} from '../actiontypes/index';

const initialState = {
    bosses: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_BOSSES:
            return {...state, bosses: payload, loading: false}
        default:
            return initialState;
    }
}