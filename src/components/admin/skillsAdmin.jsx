import React, { useEffect } from "react"
import { SKILLS_URL } from "../../constants/httpConstants"
import { getSkills } from "../../store/actions/skill.action"
import { skillsSelector } from "../../store/selectors/skill.selector"
import { useDispatch, useSelector } from "react-redux"
import editIcon from "../../assets/images/editar-60.png"
import deleteIcon from "../../assets/images/basura-50.png"
import SkillModal from "./modal/skillModal"
import { useAuth } from "../../context/authContext"

const SkillsAdmin = () => {
    const { http } = useAuth()
    const skills = useSelector(skillsSelector)
    const dispatch = useDispatch()
    const [isActive, setIsActive] = React.useState(false)

    const fetchSkills = async () => {
        await http.get(SKILLS_URL)
            .then(res => {
                dispatch(getSkills(res.data))
                return res.data
            })
            .catch(err => {console.log(err)})
    }
    
    useEffect(() => {
        fetchSkills()
    }, [isActive])
    return (
        <article className="admin-container__skills">
            <span><h3>Skills</h3> <p onClick={() => setIsActive(!isActive)}>+</p></span>
            {
                isActive && <SkillModal setIsActive={setIsActive} />
            }
            <ul>
                {
                    skills.map((skill, i) => 
                        <Skill key={i} skill={skill} fetchSkills={fetchSkills} />
                    )
                }
            </ul>
        </article>
    )
}

const Skill = ({skill, fetchSkills}) => {
    const { http } = useAuth()
    const [isActive, setIsActive] = React.useState(false)

    const onDelete = async () => {
        await http.delete(`${SKILLS_URL}/${skill.id}`)
            .catch(err => {console.log(err)})
        fetchSkills()
    }

    useEffect(() => {}, [skill])

    return (
        <>
            {
                isActive && <SkillModal skill={skill} setIsActive={setIsActive} />
            }
            <li className="admin-container__skills__item">
                <img 
                    className="admin-container__skills__item__icon" 
                    src={skill.icon} 
                    alt={skill.name} 
                />
                <p className={"admin-container__skills__item__title"}>
                    {skill.name}
                </p>
                <p className={"admin-container__skills__item__description"}>
                    {skill.description}
                </p>
                <div>
                    <img 
                        className="admin-container__skills__item__edit" 
                        src={editIcon} 
                        alt={skill.name} 
                        onClick={() => setIsActive(!isActive)}
                    />
                    <img 
                        className="admin-container__skills__item__delete" 
                        src={deleteIcon} 
                        alt={skill.name} 
                        onClick={onDelete}
                    />
                </div>
            </li>
        </>
    )
}

export default SkillsAdmin