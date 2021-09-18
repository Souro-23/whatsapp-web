import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase'
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const createChat = () => {
        const roomName = prompt("Please enter name for the chat");
        if (roomName) {
            db.collection('Rooms').add({
                name:roomName
            })
        }
    }
    return !addNewChat ? (
        <Link style={{textDecoration:"none"}} to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2 style={{ fontSize: "16px", margin: "0px", marginBottom: "5px", }}>{name}</h2>
                <p style={{ margin: "0px" }}>Last message....</p>
            </div>
        </div>
        </Link>
        
    ) : (
            <div className="sidebarChat" onClick={createChat}>
                <h2 style={{ fontSize: "16px", margin: "0px", marginBottom: "5px", }}>Add new Chat</h2>
            </div>
        )
}

export default SidebarChat
