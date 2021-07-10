import {
    GET_GAMES
} from '../actiontypes/index';

const initialState = {
    games: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_GAMES:
            return {...state, games: payload, loading: false}
        default:
            return initialState;
    }
}