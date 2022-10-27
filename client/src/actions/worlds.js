import axios from 'axios';
import {
    GET_WORLDS,
    ADD_WORLD,
    DELETE_WORLD,
    UPDATE_WORLD
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 

export const loadWorlds = () => async (dispatch) => {
    try {
        const res = await axios.get("/isekai/worlds")
        dispatch({
            type: GET_WORLDS,
            payload: res
        })
    } catch(err) {
        console.error(err)
    }
}

export const saveWorld = (world) => async (dispatch) => {
    try {
        const res = await axios.post('/isekai/worlds/new', world)
        dispatch({
            type: ADD_WORLD,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateWorld = (world) => async (dispatch) => {
    try {
        const res = await axios.post("/isekai/worlds/update", world)
        dispatch({
            type: UPDATE_WORLD,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteWorld = (world) => async (dispatch) => {
    try {
        const res = await axios.delete("/isekai/worlds/delete", {data: world})
        dispatch({
            type: DELETE_WORLD,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}