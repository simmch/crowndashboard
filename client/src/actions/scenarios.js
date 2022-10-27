import axios from 'axios';
import {
    GET_SCENARIOS,
    ADD_SCENARIO,
    DELETE_SCENARIO,
    UPDATE_SCENARIO
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 

export const loadScenarios = () => async (dispatch) => {
    try {
        const res = await axios.get("/isekai/scenarios")
        dispatch({
            type: GET_SCENARIOS,
            payload: res
        })
    } catch(err) {
        console.error(err)
    }
}

export const saveScenario = (scenario) => async (dispatch) => {
    try {
        const res = await axios.post('/isekai/scenarios/new', scenario)
        dispatch({
            type: ADD_SCENARIO,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateScenario = (scenario) => async (dispatch) => {
    try {
        const res = await axios.post("/isekai/scenarios/update", scenario)
        dispatch({
            type: UPDATE_SCENARIO,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteScenario = (scenario) => async (dispatch) => {
    try {
        const res = await axios.delete("/isekai/scenarios/delete", {data: scenario})
        dispatch({
            type: DELETE_SCENARIO,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}