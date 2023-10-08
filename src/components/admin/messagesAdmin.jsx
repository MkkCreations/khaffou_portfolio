import React, { useEffect } from "react"
import { CONTACT_URL } from "../../constants/httpConstants"
import { useAuth } from "../../context/authContext"

const MessagesAdmin = () => {
    const { http } = useAuth()
    const [messages, setMessages] = React.useState([])

    useEffect(() => {
        http.get(CONTACT_URL)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <article className='admin-container__messages'>
            <span><h3>Messages</h3></span>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        messages.map((message, index) => (
                            <tr key={index}>
                                <td>{message.name}</td>
                                <td>{message.number}</td>
                                <td>{message.email}</td>
                                <td>{message.message}</td>
                                <td>{new Date(message.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </article>
    )
}

export default MessagesAdmin