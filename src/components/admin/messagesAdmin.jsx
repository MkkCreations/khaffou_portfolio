import React, { useEffect, useState } from "react"
import { CONTACT_URL } from "../../constants/httpConstants"
import { useAuth } from "../../context/authContext"
import ConfirmModal from "./modal/confirmModal"

const MessagesAdmin = () => {
    const { http } = useAuth()
    const [messages, setMessages] = useState([])
    const [confirmModal, setConfirmModal] = useState(false)
    const [messageId, setMessageId] = useState(null)

    const deleteMessage = (id) => {
        console.log(id)
        http.delete(`${CONTACT_URL}/${id}`)
            .then(() => {
                setMessages(messages.filter(message => message.id !== id))
                setConfirmModal(!confirmModal)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        http.get(CONTACT_URL)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <>
            {
                confirmModal && <ConfirmModal 
                                    message='Are you sure you want to delete this message?' 
                                    confirm={() => {deleteMessage(messageId)}}
                                    cancel={() => {setConfirmModal(!confirmModal)}} 
                                />
            }
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            messages.map((message, i) => (
                                <tr key={i}>
                                    <td>{message.name}</td>
                                    <td>{message.number}</td>
                                    <td>{message.email}</td>
                                    <td>{message.message}</td>
                                    <td>{new Date(message.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => {
                                                setConfirmModal(!confirmModal)
                                                setMessageId(message.id)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </article>
        </>
    )
}

export default MessagesAdmin