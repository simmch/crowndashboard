import {
    GET_TITLES
} from '../actiontypes/index';

const initialState = {
    titles: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_TITLES:
            return {...state, titles: payload, loading: false}
        default:
            return initialState;
    }
}