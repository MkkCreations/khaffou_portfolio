import React, { useState } from "react"
import { useAuth } from "../../../context/authContext"
import { CHANGE_PASSWORD_URL } from "../../../constants/httpConstants"

const UserPasswordModal = ({ setIsActive }) => {
    const { http, user } = useAuth()
    const [error, setError] = useState({
        confirmPassword: null,
        newPassword: null,
        httpError: null
    })

    const [form, setForm] = useState({
        actualPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        validate(e)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = (e) => {
        switch (e.target.name) {
            case 'confirmPassword':
                if (e.target.value !== form.newPassword) {
                    e.target.style.border = '1px solid red'
                    setError({...error, confirmPassword: 'Passwords do not match'})
                } else {
                    e.target.style.border = 'none'
                    setError({...error, confirmPassword: null})
                }
                break;
            case 'newPassword':
                if (RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}').test(e.target.value) === false) {
                    e.target.style.border = '1px solid red'
                    setError({...error, newPassword: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number'})
                } else {
                    e.target.style.border = 'none'
                    setError({...error, newPassword: null})
                }
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (error.confirmPassword || error.newPassword) {
            return
        }
        setError({...error, httpError: null})
        await http.put(CHANGE_PASSWORD_URL + `/${user.id}`, form)
            .then(() => {
                setIsActive(false)
            })
            .catch(res => {
                console.log(res.response.data)
                setError({httpError: res.response.data})
            })
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <form className="modal__container__form" onSubmit={handleSubmit}>
                    <h3>Change User Password</h3>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="actualPassword">Actual Password</label>
                        <input type="text" name="actualPassword" id="actualPassword" value={form.actualPassword} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" name="newPassword" id="newPassword" value={form.newPassword} onChange={handleChange} />
                        {error.newPassword && <p className="modal__container__form__input-container__error">{error.newPassword}</p>}
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
                        {error.confirmPassword && <p className="modal__container__form__input-container__error">{error.confirmPassword}</p>}
                    </div>
                   <div>
                        {error.httpError && 
                            <p className="modal__container__form__input-container__error">
                                HTTPS error: <b>{error.httpError}</b>
                            </p>
                        }
                   </div>
                    <div className="modal__container__form__input-container">
                        <button type="button" onClick={() => setIsActive(false)}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserPasswordModal