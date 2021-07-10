import {
    GET_ARMS
} from '../actiontypes/index';

const initialState = {
    arms: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_ARMS:
            return {...state, arms: payload, loading: false}
        default:
            return initialState;
    }
}