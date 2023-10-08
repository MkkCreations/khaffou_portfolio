import { GET_SKILLS, GET_SKILL, CREATE_SKILL, DELETE_SKILL, UPDATE_SKILL, SET_SKILLS } from "../actions/actions"

const initialState = {
    skills: []
}

export const skillReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SKILLS:
            return {
                ...state,
                skills: action.payload
            }
        case GET_SKILL:
            return {
                ...state,
                skills: action.payload
            }
        case CREATE_SKILL:
            return {
                ...state,
                skills: [...state.skills, action.payload]
            }
        case DELETE_SKILL:
            return {
                ...state,
                skills: state.skills.filter(skill => skill.id !== action.payload)
            }
        case UPDATE_SKILL:
            return {
                ...state,
                skills: state.skills.map(skill => skill.id === action.payload.id ? action.payload : skill)
            }
        default:
            return state;
    }
}