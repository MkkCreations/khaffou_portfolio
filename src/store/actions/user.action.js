import { GET_USER, SET_USER, UNSET_USER } from "./actions"

export const getUser = (data) => (dispatch) => {
    dispatch({
        type: GET_USER,
        payload: data
    })
}

export const setUser = (data) => (dispatch) => {
    dispatch({
        type: SET_USER,
        payload: data
    })
}

export const unsetUser = () => (dispatch) => {
    dispatch({
        type: UNSET_USER
    })
}