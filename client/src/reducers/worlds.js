import {
    GET_WORLDS,
    ADD_WORLD,
    DELETE_WORLD,
    UPDATE_WORLD
} from '../actiontypes/index';

const initialState = {
    worlds: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_WORLDS:
            return { ...state, worlds: payload, loading: false }
        case ADD_WORLD:
            return { ...state, alert: payload }
        case DELETE_WORLD:
            return { ...state, alert: payload }
        case UPDATE_WORLD:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}