import { SIGNUP_URL, USER_URL } from "../../../constants/httpConstants"
import { useAuth } from "../../../context/authContext"
import React, { useState } from "react"
import CryptoJS from "crypto-js"

const CreateUserModal = ({ setIsActive }) => {
    const { http, setError, setMessage } = useAuth()
    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            "username": form.username,
            "name": form.name,
            "email": form.email,
            "password": CryptoJS.SHA512(form.password).toString()
        }
        http.post(SIGNUP_URL, data)
            .then(res => {
                setIsActive(false)
                setMessage("User created successfully")
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <form className="modal__container__form" onSubmit={handleSubmit}>
                    <h3>Create User</h3>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={handleChange} value={form.username} required />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={handleChange} value={form.name} required />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={handleChange} value={form.email} required />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={handleChange} value={form.password} required />
                    </div>
                    <div className="modal__container__form__input-container">
                        <button type="button" onClick={() => setIsActive(false)}>Cancel</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUserModal