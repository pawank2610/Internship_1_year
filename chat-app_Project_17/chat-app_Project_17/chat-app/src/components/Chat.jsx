import React,
{
 useState,
 useEffect
}
from "react";

import {
 collection,
 addDoc,
 query,
 orderBy,
 onSnapshot
}
from "firebase/firestore";

import {
 auth,
 db
}
from "../firebase";

import Message
from "./Message";

function Chat() {

 const [messages,
 setMessages] =
 useState([]);

 const [text,
 setText] =
 useState("");

 useEffect(() => {

   const q = query(
     collection(
       db,
       "messages"
     ),
     orderBy(
       "createdAt"
     )
   );

   const unsubscribe =
   onSnapshot(
    q,
    (snapshot) => {

      setMessages(

       snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
       )

      );

    }
   );

   return unsubscribe;

 }, []);

 const sendMessage =
 async (e) => {

  e.preventDefault();

  if(!text) return;

  await addDoc(
   collection(
    db,
    "messages"
   ),
   {
    text,
    name:
    auth.currentUser.displayName,
    photoURL:
    auth.currentUser.photoURL,
    createdAt:
    Date.now()
   }
  );

  setText("");

 };

 return (

  <div>

   <div className="chat-box">

    {
      messages.map(
      msg => (

      <Message
       key={msg.id}
       msg={msg}
      />

      ))
    }

   </div>

   <form
    onSubmit={
     sendMessage
    }
   >

    <input
     value={text}
     onChange={
      e =>
      setText(
       e.target.value
      )
     }
     placeholder="Type message..."
    />

    <button>
      Send
    </button>

   </form>

  </div>

 );

}

export default Chat;