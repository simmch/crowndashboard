import {
    GET_RANKS,
    ADD_RANK,
    DELETE_RANK,
    UPDATE_RANK
} from '../actiontypes/index';

const initialState = {
    ranks: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_RANKS:
            return { ...state, ranks: payload, loading: false }
        case ADD_RANK:
            return { ...state, alert: payload }
        case DELETE_RANK:
            return { ...state, alert: payload }
        case UPDATE_RANK:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}