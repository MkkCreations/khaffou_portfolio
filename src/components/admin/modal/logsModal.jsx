import React from "react"

const LogsModal = ({ setIsActive, log }) => {
    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__container__logs">
                    <h3>{log.name} logs</h3>
                    <ul>
                        {
                            log.operations.reverse().map((operation, i) => 
                                <li key={i}>
                                    <strong>{operation.info}</strong>
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