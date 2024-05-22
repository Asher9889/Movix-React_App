import React, {useState} from 'react'
import "./style.scss"
import { ContentWrapper } from '../../components';
import { useFirebase } from '../../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';


const CreateAccount = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const {SignUpWithEmailAndPassword} = useFirebase();

    const handleCreateAccount = async(e)=>{
        e.preventDefault();
        const user = await SignUpWithEmailAndPassword(email, password)
        console.log(user)
        console.log("user account created")
        navigate("/")
        
    }


  return (
    <div className='login-div'>
        <ContentWrapper>
            <div className="login">
                <div className="form">
                    <form onSubmit={handleCreateAccount}>
                        <p className='title'>Create Account</p>
                        <p className='subtitle'>Stay Updated with latest Movies & Tv shows</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='input1' type="email" required placeholder='Enter email...' />
                        <input onChange={(e)=> setPassword(e.target.value)} value={password}  className='input1 input2' type="password" required placeholder='Enter password...' />
                        
                        <button type='submit' className='btn input1'>Create account</button>
                    </form>
                    {/* <hr /> */}
                    <p className='login-btn'>move to <span onClick={()=> navigate("/login")}>Login Page</span></p>

                </div>
            </div>
        </ContentWrapper>
      
    </div>
  )
}

export default CreateAccount;
