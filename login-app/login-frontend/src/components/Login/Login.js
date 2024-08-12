import { Link} from 'react-router-dom';
import { useRef } from 'react';
import { setToken } from '../../utils/authOperations';
import './Login.css';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import * as process from "process";

function Login(){
    const navigate = useNavigate();
    const captchaRef = useRef(null);

    const login = async (e) => {
        try {
            e.preventDefault();
            const token = captchaRef.current.getValue();
            captchaRef.current.reset();
            const response = await axios.post('http://localhost:3070/login', {userName: e.target.userName.value, password: e.target.password.value, token: token})

            const { isVerified }= response.data;
            setToken(isVerified);
            navigate("/dashBoard");
        } catch(e) {
            console.log(e);
            alert("failed");
        }
    }

    return(
        <div className="homepage" style={{background: "#ffb347"}}>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div className="form-login">
                <form onSubmit={e => login(e)}>
                <input name='userName' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                <input name='password' type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                <div style={{ height: '20px'}}>
                    <Link to='/change' className='register'>Forgot password</Link>
                </div>
                <div>
                    <ReCAPTCHA
                    sitekey={process.env.SITE_KEY}
                    ref={captchaRef}
                />
                </div>
                <div className="login-button">
                    <button type="submit" class="btn btn-success">Login</button>
                </div>
                </form>
                <div>
                    <Link to='/register' className='register'>Not a user/Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;