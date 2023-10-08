import { createSelector } from 'reselect'

const _user = state => state.userReducer
const _logedIn = state => state.userReducer.logedIn

export const userSelector = createSelector(
    _user,
    user => user
)

export const logedInSelector = createSelector(
    _logedIn,
    logedIn => logedIn
)
