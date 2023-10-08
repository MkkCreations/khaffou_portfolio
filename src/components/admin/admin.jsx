import React, { useEffect } from "react"
import { useAuth } from "../../context/authContext"
import SkillsAdmin from "./skillsAdmin"
import ProjectsAdmin from "./projectsAdmin"
import MessagesAdmin from "./messagesAdmin"
import UserAdmin from "./userAdmin"

export const Admin = () => {
    const { user, profile } = useAuth()
    const [selected, setSelected] = React.useState('User')
    const views = [
        {
            name: 'User',
            component: <UserAdmin />
        },
        {
            name: 'Skills',
            component: <SkillsAdmin />
        },
        {
            name: 'Projects',
            component: <ProjectsAdmin />
        },
        {
            name: 'Messages',
            component: <MessagesAdmin />
        }
    ]
    
    useEffect(() => {
        if (!user) {
            profile()
        }
    }, [user])
    
    return (
        <div className="admin-container">
            <h3><hr/> Admin ({user ? user.name : ''}) <hr/></h3>

            <nav className="admin-container__navbar">
                <ul>
                    {views.map((view, index) => (
                        <li 
                            key={index} 
                            onClick={() => setSelected(view.name)}
                            className={view.name === selected ? 'admin-container__navbar__selected' : ''}
                        >{view.name}</li>
                    ))}
                </ul>
            </nav>
            
            <section>
                {views.find(view => view.name === selected).component}
            </section>

        </div>
    )
}
