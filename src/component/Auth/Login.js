import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin} from '../../services/apiService'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { GiSpinningSword } from "react-icons/gi";


const Login = (props) => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async() => {
        // validadte
        setIsLoading(true);
        // submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
                dispatch(doLogin(data))
                toast.success(data.EM);
                setIsLoading(false);
                navigate('/')
        } else {
            toast.error("Error: " + data.EM);
            setIsLoading(false)
        }
    }

     const handleKeyDown = (event) => {
        if(event && event.key === 'Enter') {
            handleLogin();
        }
     }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet ? </span>
                <button onClick={() => navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Register Pokemon
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                    type={"email"} 
                    className = "form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input 
                        type={"password"} 
                        className = "form-control" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                        >
                    </input>
                </div>
                <span className="forgot-password">Forgot password ?</span>
                <div>
                    <button 
                        className='btn-submit'
                        onClick={()=>handleLogin()}
                        disabled = {isLoading}

                    >
                        {isLoading === true && <GiSpinningSword className='loaderIcon' />}
                        <span>Login</span></button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => {navigate('/')}}> &#60;&#60; Go to HomePage</span>
                </div>
            </div>
        </div>
    )
}
export default Login