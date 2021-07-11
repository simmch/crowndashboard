import axios from 'axios';
import {
    GET_UNIVERSES,
    ADD_UNIVERSE,
    DELETE_UNIVERSE,
    UPDATE_UNIVERSE
} from '../actiontypes/index';

export const loadUniverses = () => async (dispatch) => {
    try {
        res = await axios.get("/crown/universes")
        dispatch({
            type: GET_UNIVERSES,
            payload: res
        })
    } catch(err) {
        console.error(err)
    }
}