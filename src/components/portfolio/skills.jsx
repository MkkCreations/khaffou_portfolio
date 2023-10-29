import React, { useEffect, useState } from "react"
import { skillsSelector } from "../../store/selectors/skill.selector"
import { useDispatch, useSelector } from "react-redux"
import { getSkills } from "../../store/actions/skill.action"
import { SKILLS_URL } from "../../constants/httpConstants"
import { useAuth } from "../../context/authContext"
import Loader from "../../common/loader"

export const Skills = () => {
    const { http, user } = useAuth()
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(false)
    const skills = useSelector(skillsSelector)
    const dispatch = useDispatch()

    const fetchSkills = async () => {
        setLoad(true)
        setLoading(true)
        await http.get(SKILLS_URL)
            .then(res => {
                dispatch(getSkills(res.data))
                setLoad(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (skills.length === 0) fetchSkills()
    }, [])

    return (
        <div className='skills-container'>
            <h3><hr/> My Skills <hr/></h3>
            <p>Scroll -----&gt; and hover</p>
            {
                loading ? 
                    <Loader load={load} setLoading={setLoading} />
                    :
                    <>
                        <span>
                            <a download={"resume.pdf"} id="pdflink" href={user ? user.resume : "/"} >Resume</a>
                        </span>
                        <section className="skills-container__skills">
                            {skills.map((skill, i) => <Skill key={i} skill={skill} />)}
                        </section>
                    </>
            }
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