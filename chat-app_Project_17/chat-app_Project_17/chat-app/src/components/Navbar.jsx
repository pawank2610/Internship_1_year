import React from "react";

import {
 signOut
} from "firebase/auth";

import {
 auth
} from "../firebase";

function Navbar() {

 return (

  <nav>

   <h2>
    Chat App
   </h2>

   <button
    onClick={() =>
    signOut(auth)}
   >
    Logout
   </button>

  </nav>

 );

}

export default Navbar;