import axios from 'axios';
import {
    ADD_ZONE,
    GET_ZONES,
    DELETE_ZONE,
    UPDATE_ZONE
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 


export const loadZones = () => async (dispatch) => {
    try {
        const res = await axios.get("/isekai/zones")
        dispatch({
            type: GET_ZONES,
            payload: res
        })
    } catch (err) {
        console.error(err)
    }
}

export const loadSingleZone = (zone) => async (dispatch) => {
    try {
        const res = await axios.get(`/isekai/zones/${zone}`)
        dispatch({
            type: GET_ZONES,
            payload: res
        })
        dispatch(loadUser());
    } catch (err) {
        console.error(err)
    }
}

export const saveZone = (zone) => async (dispatch) => {
    try {
        const res = await axios.post('/isekai/zones/new', zone)
        dispatch({
            type: ADD_ZONE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateZone = (zone) => async (dispatch) => {
    try {
        const res = await axios.post('/isekai/zones/update', zone)
        dispatch({
            type: UPDATE_ZONE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteZone = (zone) => async (dispatch) => {
    
    try {
        console.log(zone)
        const res = await axios.delete('/isekai/zones/delete', {data: zone})
        dispatch({
            type: DELETE_ZONE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}