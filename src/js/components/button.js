import React from 'react';

function Button(props) {
    return (
        <div onClick={props.onClick} className={`${props.className} button`}>
            {props.text}
        </div>
    );
}
export default Button;
