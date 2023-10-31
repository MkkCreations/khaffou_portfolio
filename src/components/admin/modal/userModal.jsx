import React from "react"
import { useAuth } from "../../../context/authContext"
import { USER_URL } from "../../../constants/httpConstants"
import deleteIcon from "../../../assets/images/basura-50.png"

const UserModal = ({ setIsActive }) => {
    const { http, user, setError, setMessage } = useAuth()

    const [form, setForm] = React.useState({
        image: user.image,
        username: user.username,
        name: user.name,
        bio: user.bio,
        email: user.email,
        github: user.github,
        linkedin: user.linkedin,
        number: user.number,
        location: user.location
    })

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setForm({
                    ...form,
                    image: reader.result
                })
            }
            return
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await http.put(USER_URL + `/${user.id}`, form)
            .then(res => {
                setIsActive(false)
                setMessage("User updated successfully")
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <form className="modal__container__form" onSubmit={handleSubmit}>
                    <h3>Edit User</h3>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="image">Image</label>
                        <div className="modal__container__form__input-container__images">
                            {
                                form.image &&
                                <div>
                                    <img 
                                        src={form.image} 
                                        alt={form.name} 
                                    />
                                    <img 
                                        src={deleteIcon} alt="delete"
                                        className="modal__container__form__input-container__images__delete"
                                        onClick={() => {
                                            setForm({
                                                ...form,
                                                image: ''
                                            })
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        <input 
                            type="file" 
                            name="image" 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={form.username} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" id="bio" value={form.bio} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="github">Github</label>
                        <input type="text" name="github" id="github" value={form.github} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input type="text" name="linkedin" id="linkedin" value={form.linkedin} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="number">Number</label>
                        <input type="text" name="number" id="number" value={form.number} onChange={handleChange} />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" id="location" value={form.location} onChange={handleChange} />
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

export default UserModal