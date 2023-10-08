import React, { useEffect } from "react"
import { PROJECTS_URL } from "../../constants/httpConstants"
import { useDispatch, useSelector } from "react-redux"
import editIcon from "../../assets/images/editar-60.png"
import deleteIcon from "../../assets/images/basura-50.png"
import { projectsSelector } from "../../store/selectors/project.selector"
import { getProjects } from "../../store/actions/project.action"
import ProjectModal from "./modal/projectModal"
import { useAuth } from "../../context/authContext"

const ProjectsAdmin = () => {
    const { http } = useAuth()
    const [isActive, setIsActive] = React.useState(false)
    const projects = useSelector(projectsSelector)
    const dispatch = useDispatch()

    const fetchProjects = async () => {
        await http.get(PROJECTS_URL)
            .then(res => {
                dispatch(getProjects(res.data))
                return res.data
            })
            .catch(err => {console.log(err)})
    }
    
    useEffect(() => {
        fetchProjects()
    }, [isActive])
    return (
        <article className="admin-container__projects">
            <span><h3>Projects</h3> <p onClick={() => setIsActive(!isActive)}>+</p></span>
            {
                isActive && <ProjectModal setIsActive={setIsActive} />
            }
            <ul>
                {
                    projects.map((project, i) => 
                        <Project key={i} project={project} />
                    )
                }
            </ul>
        </article>
    )
}

const Project = ({project}) => {
    const { http } = useAuth()
    const [isActive, setIsActive] = React.useState(false)

    const onChange = (e) => {
        console.log(project)
        http.put(`${PROJECTS_URL}/${project.id}`, {
            ...project,
            [e.target.name]: e.target.value
        })
            .then(res => {console.log(res)})
            .catch(err => {console.log(err)})
    }

    const onDelete = () => {
        http.delete(`${PROJECTS_URL}/${project.id}`)
            .then(res => {console.log(res)})
            .catch(err => {console.log(err)})
    }

    useEffect(() => {
        console.log(project)
    }, [project, isActive])

    return (
        <>
            {
                isActive && <ProjectModal project={project} setIsActive={setIsActive} />
            }
            <li className="admin-container__projects__item">
                <img 
                    className="admin-container__projects__item__icon" 
                    src={project.images[0]} 
                    alt={project.title} 
                />
                <p className={"admin-container__projects__item__title"}>
                    {project.title}
                </p>
                <p className={"admin-container__projects__item__description"}>
                    {project.description}
                </p>
                <div>
                    <img 
                        className="admin-container__projects__item__edit" 
                        src={editIcon} 
                        alt={project.title} 
                        onClick={() => setIsActive(!isActive)}
                    />
                    <img 
                        className="admin-container__projects__item__delete" 
                        src={deleteIcon} 
                        alt={project.title} 
                        onClick={onDelete}
                    />
                </div>
            </li>
        </>
    )
}

export default ProjectsAdmin