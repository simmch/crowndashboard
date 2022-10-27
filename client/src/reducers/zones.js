import {
    GET_ZONES,
    ADD_ZONE,
    DELETE_ZONE,
    UPDATE_ZONE
} from '../actiontypes/index';

const initialState = {
    zones: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ZONES:
            return { ...state, zones: payload, loading: false }
        case ADD_ZONE:
            return { ...state, alert: payload }
        case DELETE_ZONE:
            return { ...state, alert: payload }
        case UPDATE_ZONE:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}