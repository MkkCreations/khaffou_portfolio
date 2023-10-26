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
                dispatch(getProjects(res.data.reverse()))
                return res.data
            })
            .catch(err => {console.log(err)})
    }

   /*  const handleOrder = (array, oldIndex, newIndex) => {
        const newArray = [...array]
        console.log(array)
        newArray[oldIndex].index = Number(newIndex)
        newArray[newIndex].index = Number(oldIndex)
        console.log(newArray)

        updateProject(newArray[oldIndex])
        updateProject(newArray[newIndex])

        return newArray
    }

    const updateProject = async (project) => {
        await http.put(`${PROJECTS_URL}/${project.id}`, {
            ...project
        })
            .then(res => {console.log(res)})
            .catch(err => {console.log(err)})
    } */
    
    useEffect(() => {
        if (projects.length === 0) fetchProjects()
    }, [isActive, projects])

    return (
        <article className="admin-container__projects">
            <span>
                <h3>Projects</h3>
                <div className="admin-container__projects__actions">
                    <p onClick={() => setIsActive(!isActive)}>+</p>
                </div>
            </span>
            {
                isActive && <ProjectModal setIsActive={setIsActive} />
            }
            <ul>
                {
                    projects.map((project, i) => 
                        <li 
                            className="admin-container__projects__item"
                            /* key={i + 1}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData('index', i)
                            }}
                            onDragOver={(e) => {
                                e.preventDefault()
                            }}
                            onDrop={(e) => {
                                const oldIndex = e.dataTransfer.getData('index')
                                const newIndex = i
                                const newArray = handleOrder(projects, oldIndex, newIndex)
                                dispatch(getProjects(newArray))
                            }} */
                        >
                            <Project key={i} project={project} i={i} />
                        </li>
                    )
                }
            </ul>
        </article>
    )
}

const Project = ({project}) => {
    const { http } = useAuth()
    const [isActive, setIsActive] = React.useState(false)

    const onDelete = () => {
        http.delete(`${PROJECTS_URL}/${project.id}`)
            .catch(err => {console.log(err)})
    }

    useEffect(() => {}, [project, isActive])

    return (
        <>
            {
                isActive && <ProjectModal project={project} setIsActive={setIsActive} />
            }
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
        </>
    )
}

export default ProjectsAdmin