import {
    GET_PETS
} from '../actiontypes/index';

const initialState = {
    pets: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_PETS:
            return {...state, pets: payload, loading: false}
        default:
            return initialState;
    }
}