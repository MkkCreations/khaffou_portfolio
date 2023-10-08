import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export const Footer = () => {
    const { user, logout } = useAuth()
    return (
        <footer className="footer">
            <p>© 2023 Created By MkkCreations</p>
            {
                user? 
                    <>
                        <Link to={"/admin"}> Admin </Link>
                        <Link onClick={() => {logout()}}> Logout </Link>
                    </> 
                : 
                <Link to={"/admin"}> Admin </Link>
            }
        </footer>
    )
}