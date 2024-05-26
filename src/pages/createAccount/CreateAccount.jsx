import React, {useState} from 'react'
import "./createAccount.scss"
import { ContentWrapper } from '../../components';
import { useFirebase } from '../../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import google from "../../assets/google.png"


const CreateAccount = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");



    const navigate = useNavigate();

    const {SignUpWithEmailAndPassword, signInWithGoogle} = useFirebase();

    const handleCreateAccount = async(e)=>{
        e.preventDefault();
        const user = await SignUpWithEmailAndPassword(email, password)
        console.log(user)
        console.log("user account created")
        navigate("/")
        
    }

    const handleGoogleSignIn = ()=>{
        signInWithGoogle()
    }


  return (
    <div class='login-div'>
        <ContentWrapper>
            <div class="login">
                <div class="form">
                    <form onSubmit={handleCreateAccount}>
                        <p class='title'>Create Account</p>
                        <p class='subtitle'>Stay Updated with latest Movies & Tv shows</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} class='input1' type="email" required placeholder='Enter email...' />
                        <input onChange={(e)=> setPassword(e.target.value)} value={password}  class='input1 input2' type="password" required placeholder='Enter password...' />
                        
                        <button type='submit' class='btn input1'>Create account</button>
                    </form>
                    {/* <hr /> */}
                    {/* <div onClick={handleGoogleSignIn} class='google-login'>
                        <img src={google} alt="" />
                        <p>Login with Google</p>
                    </div> */}
                    <p class='login-btn'><span onClick={()=> navigate("/login")}>Login Page</span></p>

                </div>
            </div>
        </ContentWrapper>
      
    </div>
  )
}

export default CreateAccount;
