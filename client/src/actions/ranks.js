import axios from 'axios';
import {
    ADD_RANK,
    GET_RANKS,
    DELETE_RANK,
    UPDATE_RANK
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 


export const loadRanks = () => async (dispatch) => {
    try {
        const res = await axios.get("/isekai/ranks")
        dispatch({
            type: GET_RANKS,
            payload: res
        })
    } catch (err) {
        console.error(err)
    }
}

export const loadSingleRank = (rank) => async (dispatch) => {
    try {
        const res = await axios.get(`/isekai/ranks/${rank}`)
        dispatch({
            type: GET_RANKS,
            payload: res
        })
        dispatch(loadUser());
    } catch (err) {
        console.error(err)
    }
}

export const saveRank = (rank) => async (dispatch) => {
    try {
        const res = await axios.post('/isekai/ranks/new', rank)
        dispatch({
            type: ADD_RANK,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateRank = (rank) => async (dispatch) => {
    try {
        const res = await axios.post('/isekai/ranks/update', rank)
        dispatch({
            type: UPDATE_RANK,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteRank = (rank) => async (dispatch) => {
    
    try {
        console.log(rank)
        const res = await axios.delete('/isekai/ranks/delete', {data: rank})
        dispatch({
            type: DELETE_RANK,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}