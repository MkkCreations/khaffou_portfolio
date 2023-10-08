import { GET_USER, SET_USER, UNSET_USER } from "../actions/actions"

const initialState = {
    user: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USER:
            return {
                user: action.payload
            }

        case UNSET_USER:
            return {
                ...state,
                user: {}
            }

        default:
            return state;
    }
}