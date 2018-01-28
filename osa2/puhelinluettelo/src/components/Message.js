import React from 'react'

const Message = ({ text, type }) => (
    <div className={type}>
        {text}
    </div>
)

export default Message