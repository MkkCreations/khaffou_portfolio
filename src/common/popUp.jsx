import { useAuth } from "../context/authContext"
import React, { useEffect } from "react"

const PopUp = () => {
    const { error, setError, message, setMessage } = useAuth()
    const styles = {
        color: "white",
        backgroundColor: error ? "#ed0505" : "#5bb663"
    }

    const closePopUp = () => {
        setError(null)
        setMessage(null)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            closePopUp()
        }, 3000)
        return () => clearTimeout(timer)
    }, [error, message])

    return (
        <>
            {(message || error) &&
                <div className="pop-up">
                    <div style={styles} className="pop-up__content">
                        <span className="pop-up__content__close" onClick={closePopUp}>&times;</span>
                        <p className="pop-up__content__message" >
                            {message || error}
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUp