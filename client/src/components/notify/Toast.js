import React from 'react'

const Toast = () => {
    return (
        <div className="toast show position-fixed" style={{ left: "50%", bottom: "20px", minWidth: "200px" }}>
            <div className="toast-header">
                <strong>Title</strong>
                <button>&times;</button>
            </div>
            <div className="toast-body">
                body
            </div>
        </div>
    )
}

export default Toast