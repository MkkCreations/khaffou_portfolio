import React, { useState } from "react"
import { useAuth } from "../../../context/authContext"
import { USER_URL } from "../../../constants/httpConstants"
import deleteIcon from "../../../assets/images/basura-50.png"

export const ResumeModal = ({ setIsActive }) => {
    const { http, user } = useAuth()

    const [form, setForm] = useState({
        image: user.image,
        username: user.username,
        name: user.name,
        bio: user.bio,
        email: user.email,
        github: user.github,
        linkedin: user.linkedin,
        number: user.number,
        location: user.location,
        resume: user.resume
    })

    const handleChange = (e) => {
        if (e.target.name === 'resume') {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setForm({
                    ...form,
                    resume: reader.result
                })
            }
            return
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await http.put(USER_URL + `/${user.id}`, form)
            .then(res => {
                setIsActive(false)
            })
            .catch(err => {console.log(err)})
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <form className="modal__container__form" onSubmit={handleSubmit}>
                    <h3>Edit Resume</h3>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="image">Image</label>
                        <div className="modal__container__form__input-container__images">
                            {
                                form.resume &&
                                <div>
                                    <img 
                                        src={form.resume} 
                                        alt={form.name} 
                                    />
                                    <img 
                                        src={deleteIcon} alt="delete"
                                        className="modal__container__form__input-container__images__delete"
                                        onClick={() => {
                                            setForm({
                                                ...form,
                                                resume: ''
                                            })
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        <input 
                            type="file" 
                            name="resume"
                            id="iamge"
                            onChange={handleChange}
                        />
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
