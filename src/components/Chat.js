import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import {
  AddCircle,
  CardGiftcard,
  Gif,
  EmojiEmotions,
} from "@material-ui/icons";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import { useState } from "react";
import { useEffect } from "react";
import db from "../config/firebase";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircle />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelId}
            placeholder={
              channelName == null
                ? "Select a channel"
                : `Message #${channelName}`
            }
          />
          <button
            className="chat__inputButton"
            type="submit"
            disabled={!channelId}
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
}

export default Chat;
