import { combineReducers } from 'redux'
import { projectReducer } from './project.reducer'
import { skillReducer } from './skill.reducer'
import { userReducer } from './user.reducer'

const allReducers = combineReducers({
    projectReducer,
    skillReducer,
    userReducer
});

export default allReducers;