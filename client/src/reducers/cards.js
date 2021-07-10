import {
    GET_ALL_CARDS
} from '../actiontypes/index';

const initialState = {
    cards: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_ALL_CARDS:
            return {...state, cards: payload, loading: false}
        default:
            return initialState;
    }
}