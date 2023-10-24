import React from "react"
import { CONTACT_URL } from "../../constants/httpConstants"
import { useAuth } from "../../context/authContext"
import Loader from "./loader"

export const Contact = () => {
    const { http } = useAuth()
    const [load, setLoad] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [isActive, setIsActive] = React.useState(false)
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        number: '',
        message: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsActive(true)
        setTimeout(() => {
            setIsActive(false)
        }, 3000)
        setForm({
            name: '',
            email: '',
            number: '',
            message: ''
        })
        setLoad(true)
        setLoading(true)
        http.post(CONTACT_URL, form)
            .then(res => {
                setLoad(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='contact-container'>
            <h3><hr /> Contact <hr /></h3>
            <section>
                <div>
                    <p>Click to copy</p>
                    <button
                        type='button'
                        id='btnemail'
                        className='btn-clipboard'
                        data-bs-original-title="Copy to clipboard"
                        aria-describedby='tooltip779750'
                        onClick={() => navigator.clipboard.writeText('khaffoum@gmail.com')} >
                        <b>Email:</b> khaffoum@gmail.com
                    </button>

                    <button
                        type='button'
                        id='btnemail'
                        className='btn-clipboard'
                        data-bs-original-title="Copy to clipboard"
                        aria-describedby='tooltip779750'
                        onClick={() => navigator.clipboard.writeText('+33 641 97 45 07')} >
                        <b>Phone:</b> +33 641 97 45 07
                    </button>
                </div>

                {loading ? 
                    <Loader load={load} setLoading={setLoading} />
                    :
                    <form className='contact-container__form' onSubmit={handleSubmit}>
                        <div
                            className="alert alert-success"
                            role="alert"
                            style={{ visibility: isActive ? 'unset' : 'hidden' }}>
                            Send successfully !
                        </div>
                        <div className="form-floating mt-3 text-start">
                            <input
                                type='text'
                                name='name'
                                onChange={handleChange}
                                className="form-control"
                                id="floatingInput"
                                placeholder="Name"
                            />
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mt-3 text-start">
                            <input
                                type='email'
                                name='email'
                                onChange={handleChange}
                                className="form-control"
                                id="floatingInput"
                                placeholder="Email"
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-3 text-start">
                            <input
                                type='number'
                                name='number'
                                onChange={handleChange}
                                className="form-control"
                                id="floatingInput"
                                placeholder="Number"
                            />
                            <label htmlFor="floatingInput">Number</label>
                        </div>
                        <div className="form-floating mt-3 text-start">
                            <textarea
                                type='text'
                                name='message'
                                onChange={handleChange}
                                className="form-control"
                                id="floatingInput"
                                placeholder="Messaje"
                            ></textarea>
                            <label htmlFor="floatingInput bg-dark">Message</label>
                        </div>
                        <button className="btn btn-outline-light" type='submit'>Send</button>
                    </form>
                }
            </section>
        </div>
    )
}

