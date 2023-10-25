import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/authContext"
import editIcon from "../../assets/images/editar-60.png"
import UserModal from "./modal/userModal"
import avatar from "../../assets/images/avatar-90.png"
import Loader from "../../common/loader"

const UserAdmin = () => {
    const { user, profile, loading, setLoading } = useAuth()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        profile()
    }, [])

    return (
        <article className="admin-container__user">
            <span><h3>User</h3> <p onClick={() => {setIsActive(!isActive)}}><img src={editIcon} alt="edit" /></p></span>
            {
                isActive && <UserModal setIsActive={setIsActive} />
            }
            {loading ?
                <Loader load={loading} setLoading={setLoading} />
                :
                user &&
                <div className="admin-container__user__info">
                    <p>
                        <strong>Profile Picture:</strong>
                        <img src={user.image ? user.image : avatar} alt="profile" />
                    </p>
                    <p><strong>Username:</strong>
                        {user.username}
                    </p>
                    <p><strong>Name:</strong>
                        {user.name}
                    </p>
                    <p><strong>Bio:</strong>
                        {user.bio}
                    </p>
                    <p><strong>Email:</strong>
                        {user.email}
                    </p>
                    <p><strong>Github:</strong>
                        {user.github}
                    </p>
                    <p><strong>LinkedIn:</strong>
                        {user.linkedin}
                    </p>
                    <p><strong>Number:</strong>
                        {user.number}
                    </p>
                    <p><strong>Address:</strong>
                        {user.location}
                    </p>
                    
                </div>
            }

            
        </article>
    )
}

export default UserAdmin