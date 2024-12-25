import React from 'react'
import './Popup.css'

function PopupHelp(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='popup-header'>
                    <div className='popup-title'>Ask Help</div>
                    <button className='close-btn' onClick={() => props.setTrigger(false)}>
                        <img width="16" height="16" src="https://img.icons8.com/sf-black/64/delete-sign.png" alt="delete-sign" />
                    </button>
                </div>
                <div>Please mail your concerns to </div>
                <input className='insert-value' value={"indiravik11@gmail.com"} readOnly />
                {props.children}
            </div>
        </div>
    ) : "";
}
export default PopupHelp;