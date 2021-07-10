import {
    GET_VAULTS
} from '../actiontypes/index';

const initialState = {
    vaults: null,
    loading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_VAULTS:
            return {...state, vaults: payload, loading: false}
        default:
            return initialState;
    }
}