import React from 'react'
import LeftSide from '../components/messages/LeftSide';
import RightSide from '../components/messages/RightSide';

const Conversation = () => {
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>
            <div className="col-md-8 px-0">
                <RightSide />
            </div>
        </div>
    )
}

export default Conversation
