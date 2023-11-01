import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import CryptoJS from "crypto-js"

export const Login = () => {
    const {token} = useAuth()
    const [isActive, setIsActive] = useState(false)
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const {login, profile} = useAuth();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsActive(true)
        setTimeout(() => {
            setIsActive(false)
        }, 3000)

        const data = {
            "username": form.username,
            "password": CryptoJS.SHA512(form.password).toString()
        }
        setForm({
            username: '',
            password: ''
        })
        login(data)
    }

    useEffect(() => {
        if (token !== '') {
            try {
                profile()
                navigate('/admin')
            } catch (e) {
                console.log(e)
            }
        }
    }, [])

    return (
        <div className='login-container'>
            <h3><hr /> Login <hr /></h3>
            <section>
                <form className='login-container__form' onSubmit={handleSubmit}>
                    <div
                        className='login-container__form__input-container'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            id="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div
                        className='login-container__form__input-container'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <p>Just to see: <b>username:</b> user, <b>password:</b> useradmin</p>
                    <button
                        type='submit'
                        className='login-container__form__button'
                        disabled={isActive}
                    >
                        {isActive ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </section>
        </div>
    )
}
