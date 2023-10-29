import React from "react"

const ConfirmModal = ({ message, confirm, cancel }) => {
    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__container__confirm">
                    <h3>{message}</h3>
                    <div className="modal__buttons">
                        <button onClick={confirm}>Confirm</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal