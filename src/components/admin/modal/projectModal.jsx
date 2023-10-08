import React from "react"
import { PROJECTS_URL } from "../../../constants/httpConstants"
import deleteIcon from "../../../assets/images/basura-50.png"
import { useAuth } from "../../../context/authContext"

const ProjectModal = ({project = null, setIsActive}) => {
    const { http } = useAuth()
    const [form, setForm] = React.useState({
        title: project ? project.title : '',
        description: project ? project.description : '',
        images: project ? project.images : [],
        stack: project ? project.stack : [],
        url: project ? project.url : '',
        github: project ? project.github : ''
    })

    const handleChange = (e) => {
        if (e.target.name === 'images') {
            for (let i = 0; i < e.target.files.length; i++) {
                let reader = new FileReader()
                reader.readAsDataURL(e.target.files[i])
                reader.onload = () => {
                    form.images.push(reader.result)
                    setForm({
                        ...form,
                        images: form.images
                    })
                }
            }
            return
        }

        if (e.target.name === 'stack') {
            setForm({
                ...form,
                stack: e.target.value.split(',')
            })
            return
        }

        
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (project) {
            const data = {
                ...form,
                id: project.id,
                images: form.images.length === 0 ? project.images : form.images
            }
            console.log(form)
            await http.put(PROJECTS_URL + `/${project.id}`, data)
                .then(res => {console.log(res)})
                .catch(err => {console.log(err)})
        }
        else {
            await http.post(PROJECTS_URL, form)
                .then(res => {console.log(res)})
                .catch(err => {console.log(err)})
        }

        setIsActive(false)
        setForm({
            title: '',
            description: '',
            images: [],
            stack: [],
            url: '',
            github: ''
        })
    }

    
    return (
        <div className="modal">
            <div className="modal__container">
                <form className="modal__container__form" onSubmit={handleSubmit}>
                    <h3>{project ? 'Edit Project' : 'Add Project'}</h3>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={form.title} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            name="description" 
                            value={form.description} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="images">Images</label>
                        <div className="modal__container__form__input-container__images">
                            {
                                form.images.map((image, i) => 
                                    <div>
                                        <img 
                                            key={i} 
                                            src={image} 
                                            alt={form.title} 
                                        />
                                        <img 
                                            src={deleteIcon} alt="delete"
                                            className="modal__container__form__input-container__images__delete"
                                            onClick={() => {
                                                form.images.splice(i, 1)
                                                setForm({
                                                    ...form,
                                                    images: form.images
                                                })
                                            }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <input 
                            type="file" 
                            name="images" 
                            onChange={handleChange} 
                            multiple
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="stack">Stack</label>
                        <input
                            type="text"
                            name="stack"
                            value={form.stack}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="url">URL</label>
                        <input 
                            type="text" 
                            name="url" 
                            defaultValue={form.url} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal__container__form__input-container">
                        <label htmlFor="github">Github</label>
                        <input 
                            type="text" 
                            name="github" 
                            defaultValue={form.github} 
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

export default ProjectModal