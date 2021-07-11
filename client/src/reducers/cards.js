import {
    GET_ALL_CARDS,
    GET_CARD,
    ADD_CARD,
    DELETE_CARD,
    UPDATE_CARD
} from '../actiontypes/index';

const initialState = {
    cards: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_CARDS:
            return { ...state, cards: payload, loading: false }
        case GET_CARD:
            return { ...state, cards: payload, loading: false }
        case ADD_CARD:
            return { ...state, alert: payload }
        case DELETE_CARD:
            return { ...state, alert: payload }
        case UPDATE_CARD:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}