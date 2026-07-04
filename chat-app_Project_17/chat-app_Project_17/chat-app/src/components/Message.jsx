import React from "react";

function Message({ msg }) {

 return (

  <div className="message">

   <img
    src={msg.photoURL}
    alt=""
   />

   <div>

    <h4>{msg.name}</h4>

    <p>{msg.text}</p>

   </div>

  </div>

 );

}

export default Message;