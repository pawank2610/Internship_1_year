import React from "react";

import {
 useAuthState
}
from "react-firebase-hooks/auth";

import {
 auth
}
from "./firebase";

import Login
from "./components/Login";

import Chat
from "./components/Chat";

import Navbar
from "./components/Navbar";

function App() {

 const [user] =
 useAuthState(auth);

 return (

  <div>

   {
    user
    ?
    <>
      <Navbar />
      <Chat />
    </>
    :
    <Login />
   }

  </div>

 );

}

export default App;