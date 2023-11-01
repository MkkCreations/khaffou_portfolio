import React, { useEffect } from "react"

const LogsModal = ({ setIsActive, log }) => {

    const scrollToBottom = () => {
        const element = document.getElementById("logsList")
        element.scrollTop = element.scrollHeight
    }

    useEffect(() => {
        scrollToBottom()
    }, [])

    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__container__logs">
                    <h3>{log.name} logs</h3>
                    <ul id="logsList">
                        {
                            log.operations.map((operation, i) => 
                                <li key={i}>
                                    <strong>
                                        {operation.info}
                                    </strong>
                                    <text style={{color: "green"}}>[ {operation.date} ] </text>
                                </li>
                            )
                        }
                    </ul>
                    <button className="modal__container__button" onClick={() => setIsActive(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default LogsModal