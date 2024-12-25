import React from 'react'
import './Popup.css'
import { getDatabase, ref, set } from 'firebase/database';
import { useState } from 'react';

function PopupAdd(props) {
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');

    const db = getDatabase();

    // pass the data already taken from the App.js here and then you can check if both are there are not...


    const handleRequest = (e) => {
        e.preventDefault();
        const isExistingUser = props.liveData.some((data) => {
            return username === data.id || website === data.url;
        });
        if (isExistingUser) {
            alert("Website already present in the database");
            setUsername('');
            setWebsite('');
            return;
        }
        if (!username.trim() || !website.trim()) {
            alert("Please fill in both username and website URL.");
            return;
        }
        if (!website.startsWith("https://")) {
            alert("The URL is not in the required format!");
            return;
        }
        const userId = new Date().getTime();
        set(ref(db, 'users/' + userId), {
            username: username,
            website: website
        })
            .then(() => {
                alert("User details added successfully!");
                setUsername('');
                setWebsite('');
                props.setTrigger(false);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='popup-header'>
                    <div className='popup-title'>Add your website</div>
                    <button className='close-btn' onClick={() => props.setTrigger(false)}>
                        <img width="16" height="16" src="https://img.icons8.com/sf-black/64/delete-sign.png" alt="delete-sign" />
                    </button>
                </div>
                <input className='insert-value' placeholder='Enter username / id (Example: alpha_01)' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='insert-value' placeholder='Enter your website URL (Example: https://example.com)' value={website} onChange={(e) => setWebsite(e.target.value)} />
                <div className='note-pt'>Note* Please enter website link with https://your_website_url</div>
                <button className='submit-btn' onClick={(e) => handleRequest(e)}>Send Request</button>
                {props.children}
            </div>
        </div>
    ) : "";
}
export default PopupAdd;