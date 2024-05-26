import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import { ContentWrapper, Toast } from '../../components'
import { useFirebase } from '../../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

import google from "../../assets/google.png"



const Login = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");


    const navigate = useNavigate();

    const {loginWithEmailAndPassword, isLoggedIn , signInWithGoogle, getRedirectResult} = useFirebase();
    console.log(isLoggedIn)

    
    const handleGoogleSignIn =  ()=>{
        // e.preventDefault();
        signInWithGoogle()
        // console.log("google auth")
    }

    
    
    
    
    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            const result = await loginWithEmailAndPassword(email, password)
            console.log(result)
            console.log("successfully logged in" )
            setToast(true)
        } catch (error) {
            console.log("error during email login ", error)
            
            
        }
        
    }
 
    useEffect(()=>{
        
  
        if (isLoggedIn) navigate("/")


    }, [isLoggedIn, handleSubmit, handleGoogleSignIn]) 


    
  return (
    <div class='login-div'>
        <ContentWrapper>
            <div class="login">
                <div class="form">
                    <form onSubmit={handleSubmit}>
                        <p class='title'>Login</p>
                        <p class='subtitle'>Stay Updated with latest Movies & Tv shows</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} class='input1' type="email" required placeholder='Enter email...' />
                        <input onChange={(e)=> setPassword(e.target.value)} value={password}  class='input1 input2' type="password" required placeholder='Enter password...' />
                        
                        <button type='submit' class='btn input1'>Log In</button>
                    </form>
                    {/* <div onClick={handleGoogleSignIn} class='google-login'>
                        <img src={google} alt="" />
                        <p>Login with Google</p>
                    </div> */}
                    {/* <hr /> */}
                    <p class='login-btn'><span onClick={()=> navigate("/signup")}>Create Account</span></p>

                </div>
            </div>
        </ContentWrapper>
      
    </div>
  )
}

export default Login
