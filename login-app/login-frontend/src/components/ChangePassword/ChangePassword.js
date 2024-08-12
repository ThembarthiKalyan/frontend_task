import './ChangePassword.css';
import { useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { setId, setToken } from '../../utils/authOperations';

function ChangePassword(){
    const navigate = useNavigate();
    const captchaRef = useRef(null);
    const resetPassword = async(e) =>{
        try{
            e.preventDefault();
            const token = captchaRef.current.getValue();
            captchaRef.current.reset();
            const response = await axios.post('http://localhost:3070/reset-password', {userName: e.target.userName.value, token: token});
            const { isVerified }= response.data;
            setToken(isVerified);
            setId(response.data.id);
            if(isVerified){
                navigate("/new-password");
            }else{
                navigate("/change");
            }
            
        }catch(e){
            alert(e.message);
        }

    }

    return(
        <div className="form-login">
            <form onSubmit={e => resetPassword(e)}>
            <input name='userName' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
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
        </div>
    )
}

export default ChangePassword;