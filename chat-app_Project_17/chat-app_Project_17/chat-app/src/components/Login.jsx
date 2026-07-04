import React from "react";
import {
 signInWithPopup
} from "firebase/auth";

import {
 auth,
 provider
} from "../firebase";

function Login() {

 const login = async () => {

   await signInWithPopup(
     auth,
     provider
   );

 };

 return (

   <div className="login">

     <h1>Chat App</h1>

     <button onClick={login}>
       Sign In With Google
     </button>

   </div>

 );

}

export default Login;