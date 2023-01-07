import React, {useState, useEffect} from 'react'
import "./Chat.css"
import {Avatar, IconButton} from "@mui/material";
import { AttachFile, SearchOutlined, MoreVert, DockSharp} from '@mui/icons-material';
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import {useParams} from "react-router-dom";
import db from "./firebase"
import {onSnapshot, collection, doc, addDoc, query, orderBy, serverTimestamp} from "firebase/firestore" 
import firebase from 'firebase/compat/app';
import {useStateValue} from "./StateProvider";


function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomID } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        // Rewrite to have working with new firbase verion 9
        if(roomID) {

            const rname = onSnapshot(doc(db, "rooms", roomID), (doc)=>{
                setRoomName(doc.data().name);
            })

            const ref = doc(db, "rooms", roomID);
            const msgName = query(collection(ref, "messages"), orderBy('timestamp', 'asc'));
            const snap = onSnapshot(msgName, (snapshot) =>(setMessages(
                snapshot.docs.map((doc)=>doc.data()))
            ))
            
            /**
            db.collection("rooms").doc(roomID).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc)=>doc.data())));
            */
        }
    }, [roomID]);

    useEffect(()=> {
        setSeed(Math.floor(Math.random()*5000))
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);

        /**
        const ref_2 = doc(db, "rooms", roomID);
        const addMsg = query(collection(ref_2, "messages"));
        const addToDoc_2 = addDoc((addMsg), {
            message: input,
            name: user.displayName, //coming from google authentication
            //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        To be fixed
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimeStamp()
        })*/
        // upto here

        setInput("");
    };

  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen at...</p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>

        </div>
        
        <div className="chat__body">
            <p className={`chat__message ${true &&"chat__reciever"}`}>
                    <span className="chat__name">
                    Isha Verma</span>
                    Hey Guys
                    <span className="chat__timestamp">
                        10:01pm
                    </span>
            </p>
            
        </div>
        
        <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)}
                 placeholder="Type a message" type="text" />
                <button onClick={sendMessage} type="submit"> Send a message</button>
            </form>
            <MicIcon />
        
        </div>

    </div>
  )
}

export default Chat

/**
    {messages.map((message) => (
        <p className={`chat__message ${true &&"chat__reciever"}`}>
            <span className="chat__name">
            Isha Verma</span>
            Hey Guys
            <span className="chat__timestamp">
                10:01pm
            </span>
        </p>
    ))}
 */