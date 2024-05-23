import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react"
import { initializeApp} from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged , signOut, GoogleAuthProvider , signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyAu5x6hoNHGYD2NBLF6W3bnd9MAA0svjcc",
    authDomain: "movix-d7dbe.firebaseapp.com",
    projectId: "movix-d7dbe",
    storageBucket: "movix-d7dbe.appspot.com",
    messagingSenderId: "728570849415",
    appId: "1:728570849415:web:4f0c31debf174eda6bf022",
    measurementId: "G-LJBK3RYMMJ"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)

  const provider = new GoogleAuthProvider();

export const FirebaseContext = createContext();

export const useFirebase = ()=> useContext(FirebaseContext)


export const FirebaseProvider = (props)=>{

    const [user, setUser] = useState(false);
    

    const SignUpWithEmailAndPassword = (email, password)=>{
       return createUserWithEmailAndPassword(auth, email, password) 
    }

    const loginWithEmailAndPassword = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password) 
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(true)
            }else{
                setUser(false)
                
            }
        }) 
    }, [])

    const isLoggedIn = user ? true : false ;

    const signOutUser = async()=>{
        await signOut(auth) 
        console.log("user succesfully signout")
    }

    const signInWithGoogle = async()=>{
        const user = await signInWithPopup(auth, provider)
        console.log(user)
        console.log("Auth with google successfully completed")
    }

    const current_user = auth.currentUser
    // console.log(current_user)


    return (
        <FirebaseContext.Provider value={{SignUpWithEmailAndPassword, loginWithEmailAndPassword, signOutUser, signInWithGoogle , isLoggedIn, current_user}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
