import React, { useState ,useEffect} from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import Chat from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        db.collection("Rooms").onSnapshot((snapshot) => {
            console.log(snapshot)
            setRooms(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        })
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__serachContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room =>(
                    <SidebarChat 
                    key={room.id} 
                    id={room.id} 
                    name={room.data.name} />
                ))}
            </div>
        </div>
    )
}


export default Sidebar
