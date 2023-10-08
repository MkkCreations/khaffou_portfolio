import {
    GET_SKILLS,
    CREATE_SKILL,
    DELETE_SKILL,
    UPDATE_SKILL,
    GET_SKILL
} from "./actions"

export const getSkills = (data) => (dispatch) => {
    dispatch({
        type: GET_SKILLS,
        payload: data
    })
}

export const getSkill = (data) => (dispatch) => {
    dispatch({
        type: GET_SKILL,
        payload: data
    })
}

export const createSkill = (data) => (dispatch) => {
    dispatch({
        type: CREATE_SKILL,
        payload: data
    })
}

export const deleteSkill = (data) => (dispatch) => {
    dispatch({
        type: DELETE_SKILL,
        payload: data
    })
}

export const updateSkill = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_SKILL,
        payload: data
    })
}
