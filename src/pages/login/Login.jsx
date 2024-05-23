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

    const {loginWithEmailAndPassword, isLoggedIn , signInWithGoogle} = useFirebase();
    console.log(isLoggedIn)

    useEffect(()=>{
        // if (isLoggedIn) navigate("/")

    }, [isLoggedIn, signInWithGoogle, loginWithEmailAndPassword]) 

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

    const handleGoogleSignIn = async()=>{
        await signInWithGoogle()
    }
    

  return (
    <div className='login-div'>
        <ContentWrapper>
            <div className="login">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <p className='title'>Login</p>
                        <p className='subtitle'>Stay Updated with latest Movies & Tv shows</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='input1' type="email" required placeholder='Enter email...' />
                        <input onChange={(e)=> setPassword(e.target.value)} value={password}  className='input1 input2' type="password" required placeholder='Enter password...' />
                        
                        <button type='submit' className='btn input1'>Log In</button>
                    </form>
                    {/* <hr /> */}
                    <div onClick={handleGoogleSignIn} className='google-login'>
                        <img src={google} alt="" />
                        <p>Login with Google</p>
                    </div>
                    <p className='login-btn'><span onClick={()=> navigate("/signup")}>Create Account</span></p>

                </div>
            </div>
        </ContentWrapper>
      
    </div>
  )
}

export default Login
