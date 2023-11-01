import React from "react"
import { SKILLS_URL } from "../../../constants/httpConstants"
import deleteIcon from "../../../assets/images/basura-50.png"
import { useAuth } from "../../../context/authContext"

const SkillModal = ({skill = null, setIsActive}) => {
    const { http } = useAuth()
    const [form, setForm] = React.useState({
        name: skill ? skill.name : '',
        description: skill ? skill.description : '',
        icon: skill ? skill.icon : ''
    })

    const handleChange = (e) => {

        if (e.target.name === 'icon') {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setForm({
                    ...form,
                    icon: reader.result
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

        if (skill) {
            const data = {
                ...form,
                id: skill.id
            }
            console.log(form)
            await http.put(SKILLS_URL + `/${skill.id}`, data)
                .catch(err => {console.log(err)})
        }
        else {
            await http.post(SKILLS_URL, form)
                .catch(err => {console.log(err)})
        }

        setIsActive(false)
        setForm({
            name: '',
            description: '',
            icon: ''
        })
    }

    
    return (
        <div className="modal">
            <div className="modal__container">
                <form className="modal__container__form" onSubmit={handleSubmit}>
                    <h3>{skill ? 'Edit Skill' : 'Add Skill'}</h3>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value={form.name} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            name="description" 
                            id="description"
                            value={form.description} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="icon">Icon</label>
                        <div className="modal__container__form__input-container__images">
                            {
                                form.icon &&
                                <div>
                                    <img 
                                        src={form.icon} 
                                        alt={form.name} 
                                    />
                                    <img 
                                        src={deleteIcon} alt="delete"
                                        className="modal__container__form__input-container__images__delete"
                                        onClick={() => {
                                            setForm({
                                                ...form,
                                                icon: ''
                                            })
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        <input 
                            type="file" 
                            name="icon" 
                            id="icon"
                            onChange={handleChange}
                            required={skill ? false : true}
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

export default SkillModal