import React from 'react'
import LeftSide from '../components/messages/LeftSide'

const Messages = () => {
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>
            <div className="col-md-8 px-0">
                <div className="d-flex justify-content-center align-items-center flex-column h-100">
                    <i className="fab fa-facebook-messenger text-primary" style={{ fontSize: "3rem" }}></i>
                    <h4>Conversations</h4>
                </div>
            </div>
        </div>
    )
}

export default Messages