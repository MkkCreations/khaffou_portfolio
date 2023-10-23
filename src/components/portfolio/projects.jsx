import React, { useState } from "react"
import { projectsSelector } from "../../store/selectors/project.selector"
import { useDispatch, useSelector } from "react-redux"
import arrowRight from '../../assets/svg/arrow-right.svg'
import arrowLeft from '../../assets/svg/arrow-left.svg'
import { PROJECTS_URL } from "../../constants/httpConstants"
import { getProjects } from "../../store/actions/project.action"
import { useAuth } from "../../context/authContext"
import Loader from "./loader"

export const Projects = () => {
    const { http } = useAuth()
    const [load, setLoad] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const projects = useSelector(projectsSelector)
    const dispatch = useDispatch()

    const fetchProjects = async () => {
        setLoad(true)
        setLoading(true)
        await http.get(PROJECTS_URL)
            .then(res => {
                dispatch(getProjects(res.data))
                setLoad(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        if (projects.length === 0) fetchProjects()
    }, [])
    
    return (
        <div className='projects-container'>
            <h3><hr/>My Projects <hr/></h3>
            <div className="projects-container__projects">
                {loading ? 
                    <Loader load={load} setLoading={setLoading} />
                    :
                    projects.reverse().map((project, index) => (
                        <ProjectView key={index} project={project} />
                    ))
                }
            </div>
        </div>
    )
}

const ProjectView = ({ project }) => {
    const [img, setImg] = useState(project?.images[0])

    return (
        <div className="projects-container__projects__item">
            <span 
                style={{backgroundImage: `url(${img})`}}
                className='projects-container__projects__item__img'>
                    {
                        project.images.length > 1 && 
                        <>
                            <div></div>
                            <div className="projects-container__projects__item__img__arrows">
                                <img src={arrowLeft} alt="arrow" onClick={() => {
                                    const index = project.images.indexOf(img)
                                    setImg(project.images[(index - 1 + project.images.length) % project.images.length])
                                }
                                }/>

                                <img src={arrowRight} alt="arrow" onClick={() => {
                                    const index = project.images.indexOf(img)
                                    setImg(project.images[(index + 1 + project.images.length) % project.images.length])
                                }
                                }/>
                            </div>
                            <div className="projects-container__projects__item__img__points">
                                {project.images.map((image, index) => (
                                    <div key={index} className={`projects-container__projects__item__img__points__point ${image === img ? 'active' : ''}`} onClick={() => setImg(image)}></div>
                                ))}
                            </div>
                        </>
                    }
            </span>
            <article className='projects-container__projects__item__article'>
                <h3>{project.title}</h3>
                <a href={project.url} target='_blank' rel='noreferrer'>
                    <div>
                        <p>
                            {project.description}
                        </p>
                    </div>
                    <p>
                        {project.stack.map((tech, index) => (
                            <span key={index}>{tech} </span>
                        ))}
                    </p>
                </a>
            </article>
        </div>
    )
}