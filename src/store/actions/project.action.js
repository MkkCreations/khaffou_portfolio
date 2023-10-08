import { GET_PROJECTS, GET_PROJECT, CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "./actions"

export const getProjects = (data) => (dispatch) => {
    dispatch({
        type: GET_PROJECTS,
        payload: data
    })
}

export const getProject = (data) => (dispatch) => {
    dispatch({
        type: GET_PROJECT,
        payload: data
    })
}

export const createProject = (data) => (dispatch) => {
    dispatch({
        type: CREATE_PROJECT,
        payload: data
    })
}   

export const deleteProject = (data) => (dispatch) => {
    dispatch({
        type: DELETE_PROJECT,
        payload: data
    })
}

export const updateProject = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_PROJECT,
        payload: data
    })
}

