import React, { useEffect } from "react"
import { useAuth } from "../../context/authContext"
import { LOGS_URL } from "../../constants/httpConstants"

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
                        <>
                            <Log key={i} log={log} />
                        </>
                    )
                }
            </ul>
        </article>
    )
}

const Log = ({log}) => {
    return (
        <>
            {
                log.operations.map((op, i) =>
                    <li key={i} className="admin-container__logs__item">
                        <text style={{color: "green"}}>[ {op.date} ] :</text> <strong>{op.info}</strong>
                    </li>
                )
            }
        </>
    )
}

export default LogsAdmin