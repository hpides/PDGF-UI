import React from 'react'

export default function Screen(props) {
    return (
        <div>
            <textarea rows="5" cols="60" readOnly value={props.value}/>
        </div>
    )
}
