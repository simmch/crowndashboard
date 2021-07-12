import axios from 'axios';
import {
    ADD_CARD,
    GET_ALL_CARDS,
    GET_CARD,
    DELETE_CARD,
    UPDATE_CARD
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 


export const loadCards = () => async (dispatch) => {
    try {
        const res = await axios.get("/crown/cards")
        dispatch({
            type: GET_ALL_CARDS,
            payload: res
        })
    } catch (err) {
        console.error(err)
    }
}

export const loadSingleCard = (card) => async (dispatch) => {
    console.log(card)
    try {
        const res = await axios.get(`/crown/cards/${card}`)
        dispatch({
            type: GET_CARD,
            payload: res
        })
        dispatch(loadUser());
    } catch (err) {
        console.error(err)
    }
}