
export const API_URL_VAR = process.env.API_URL || 'http://localhost:8080/api'
export const SKILLS_URL = `${API_URL_VAR}/skills`
export const PROJECTS_URL = `${API_URL_VAR}/projects`
export const CONTACT_URL = `${API_URL_VAR}/message`
export const AUTH_URL = `${API_URL_VAR}/auth`
export const LOGIN_URL = `${AUTH_URL}/login`
export const USER_URL = `${API_URL_VAR}/user`
export const USER_DATA_URL = `${USER_URL}/data`
export const PROFILE_URL = `${API_URL_VAR}/user/me`
export const REGISTER_URL = `${AUTH_URL}/register`
export const LOGOUT_URL = `${AUTH_URL}/logout`
export const REFRESH_URL = `${AUTH_URL}/refresh-token`
export const LOGS_URL = `${API_URL_VAR}/logs`