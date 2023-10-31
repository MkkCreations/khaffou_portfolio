import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/authContext"
import { LOGS_URL } from "../../constants/httpConstants"
import LogsModal from "./modal/logsModal"

const LogsAdmin = () => {
    const { http } = useAuth()
    const [logs, setLogs] = React.useState([])

    const fetchLogs = async () => {
        await http.get(LOGS_URL)
            .then(res => {
                setLogs(res.data)
            })
            .catch(err => {console.log(err)})
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <article className="admin-container__logs">
            <span><h3>Logs</h3></span>
            <ul>
                {
                    logs.map((log, i) => 
                        <li>
                            <Log key={i} log={log} />
                        </li>
                    )
                }
            </ul>
        </article>
    )
}

const Log = ({log}) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <>
            {
                isActive && <LogsModal setIsActive={setIsActive} log={log} />
            }
            <li className="admin-container__logs__item" onClick={() => setIsActive(true)}>
                <p>{log.name} logs</p>
                <h6>Last changes:</h6>
                <div>
                    <strong>{log.operations[log.operations.length - 1].info}</strong>
                    <text style={{color: "green"}}>[ {log.operations[log.operations.length - 1].date} ] </text>
                </div>
            </li>
        </>
    )
}

export default LogsAdmin