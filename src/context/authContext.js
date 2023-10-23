import React, { createContext,useContext, useState } from "react";
import { API_URL, LOGIN_URL, LOGOUT_URL, PROFILE_URL, REFRESH_URL } from "../constants/httpConstants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There is not AuthProvaider');
    return context;
}

export function AuthProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '')
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken')? localStorage.getItem('refreshToken') : '')

    const http = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer " + token
        }
    })
      
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const signup = (data) => {

    }

    const login = (data) => {
        setLoading(true)
        http.post(LOGIN_URL, data)
            .then(res => {
                const user = res.data.user
                const token = res.data.accessToken
                const refreshToken = res.data.refreshToken
                setUser(user)
                setToken(token)
                setRefreshToken(refreshToken)
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)
                setLoading(false)
                navigate('/admin')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const profile =  () => {
        setLoading(true)
        http.get(PROFILE_URL)
            .then(res => {
                console.log(res)
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                refresh()
            })
    }

    const refresh = () => {
        const data = {
            'refreshToken': refreshToken
        }
        setLoading(true)
        http.post(REFRESH_URL, data)
            .then(res => {
                const user = res.data.user
                const token = res.data.accessToken
                const refreshToken = res.data.refreshToken
                setUser(user)
                setToken(token)
                setRefreshToken(refreshToken)
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                setError(err.message)
            })
    }

    const logout = () => {
        const data = {
            'accessToken' : token,
            'refreshToken' : refreshToken
        }
        
        http.post(LOGOUT_URL, data)
            .then(res => {
                console.log(res)
                setUser(null)
                setToken('')
                setRefreshToken('')
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
    }

    return (
        
        <authContext.Provider value={{signup, login, profile, logout, setLoading, loading, http, user, token, refreshToken, error}}>
            {children}
        </authContext.Provider>
    )
}