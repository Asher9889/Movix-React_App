import React, { useContext, useState } from 'react'
import "./style.scss"
import { ContentWrapper } from '../../components'
import { useFirebase } from '../../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    const {loginWithEmailAndPassword} = useFirebase();

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            const result = await loginWithEmailAndPassword(email, password)
            console.log(result)
            console.log("successfully logged in" )
        } catch (error) {
            console.log("error during email login ", error)
        }

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
                    <p className='login-btn'>move to <span onClick={()=> navigate("/signup")}>Create Account</span></p>

                </div>
            </div>
        </ContentWrapper>
      
    </div>
  )
}

export default Login
