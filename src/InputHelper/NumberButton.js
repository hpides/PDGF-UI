import React from 'react'

export default function NumberButton(props) {
    return (
        <div>
            <button className={props.type === "action"? "button action-button" : "button input-button"}
            onClick={props.handleClick}
            value={props.label}
            />
        </div>
    )
}
