import React from "react"
import { skillsSelector } from "../../store/selectors/skill.selector"
import { useDispatch, useSelector } from "react-redux"
import { getSkills } from "../../store/actions/skill.action"
import { SKILLS_URL } from "../../constants/httpConstants"
import { useAuth } from "../../context/authContext"

export const Skills = () => {
    const { http } = useAuth()
    const skills = useSelector(skillsSelector)
    const dispatch = useDispatch()

    const fetchSkills = async () => {
        await http.get(SKILLS_URL)
            .then(res => {
                dispatch(getSkills(res.data))
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        fetchSkills()
    }, [])

    return (
        <div className='skills-container'>
            <h3><hr/> My Skills <hr/></h3>
            <p>Scroll -----&gt; and hover</p>
            <span>
                <a id='pdflink' href={"/"} target="_blank" rel='noreferrer'>Resume</a>
            </span>
            <section className="skills-container__skills">
                {skills.map((skill, i) => <Skill key={i} skill={skill} />)}
            </section>
            <section className="skills-container__skills">
                {skills.map((skill, i) => <Skill key={i} skill={skill} />)}
            </section>
        </div>
    )
}

const Skill = ({ skill }) => {
    return (
        <div className="skills-container__skills__item">
            <div>
                <img className="skills-container__skills__item__img" src={skill.icon} alt={skill.name} />
            </div>
            <h3 className="skills-container__skills__item__name">{skill.name}</h3>
            <p className="skills-container__skills__item__desc">{skill.description}</p>
        </div>
    )
}