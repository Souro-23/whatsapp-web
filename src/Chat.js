import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import db from './firebase'
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] =useStateValue();


    useEffect(() => {
        if (roomId) {
            db.collection("Rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
            db.collection("Rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", 'asc')
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc =>
                        doc.data()))
                )
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed", input)
        db.collection("Rooms").doc(roomId).collection("messages").add({
           message:input,
           name:user.displayName,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");

    }
    return (
        <div className="Chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {
                           new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                            {message.message}
                        <span className="chat__timeStamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}



            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} type="text" onChange={e => setInput(e.target.value)} placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send a mesaage</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
