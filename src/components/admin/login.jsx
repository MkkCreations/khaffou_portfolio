import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export const Login = () => {
    const {token, refreshToken} = useAuth()
    const [isActive, setIsActive] = React.useState(false)
    const [form, setForm] = React.useState({
        username: '',
        password: ''
    })
    const {user, login, profile} = useAuth();
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
        setForm({
            username: '',
            password: ''
        })
        login(form)
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
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
