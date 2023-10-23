import React, { useState } from "react"
import editIcon from "../../assets/images/editar-60.png"
import Loader from "../portfolio/loader"
import { useAuth } from "../../context/authContext"
import { ResumeModal } from "./modal/resumeModal"

export const ResumeAdmin = () => {
    const { user, profile, loading, setLoading } = useAuth()
    const [isActive, setIsActive] = useState(false)

    return (
        <article className="admin-container__user">
            <span><h3>Resume</h3> <p onClick={() => {setIsActive(!isActive)}}><img src={editIcon} alt="edit" /></p></span>
            {
                isActive && <ResumeModal setIsActive={setIsActive} />
            }
            {loading ?
                <Loader load={loading} setLoading={setLoading} />
                :
                user &&
                    <embed src={user.resume} width="100%" height="1000px" />

            }
        </article>
    )
}