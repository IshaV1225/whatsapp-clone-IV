import { Avatar, IconButton } from '@mui/material'
import React, {useEffect, useState} from "react"
import DonutLargeIcon from "@mui/icons-material/DonutLarge"
import ChatIcon from "@mui/icons-material/Chat"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { SearchOutlined } from '@mui/icons-material'
import SidebarChat from "./SidebarChat"
import './Sidebar.css'
import db from "./firebase"
import {onSnapshot, collection, query, doc} from "firebase/firestore" 
import { useStateValue } from './StateProvider'


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(()=> {

        const q = query(collection(db, 'rooms'));
        const snap = onSnapshot(q, (snapshot) =>{
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })
    }, []);
    const photoURL = user.photoURL;

  return (
    <div className="sidebar">
        <div className="sidebar__header">
            <Avatar src={photoURL}/>
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div >

        </div>
        <div className="sidebar__search">
            <div
            className="sidebar__searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" type="text"/>
            </div>
            
        </div>
        <div className="sidebar__chats">
            <SidebarChat addNewChat/>
            {rooms.map(room =>(
                <SidebarChat key={room.id} id={room.id} 
                name={room.data.name} />
            ))}
        </div>

    </div>
  )
}

export default Sidebar