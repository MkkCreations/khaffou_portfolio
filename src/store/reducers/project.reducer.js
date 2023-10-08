import { GET_PROJECTS, GET_PROJECT, CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "../actions/actions";

const initialState = {
    projects: []
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case GET_PROJECT:
            return {
                ...state,
                projects: action.payload
            }
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload)
            }
        case UPDATE_PROJECT:
            return {
                ...state,
                projects: state.projects.map(project => project.id === action.payload.id ? action.payload : project)
            }
        default:
            return state;
    }
}
    