import './SignUp.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

function SignUp(){
    const navigate =useNavigate();

    const register = async (e) => {
        try {
            e.preventDefault();
            let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7}$/;
            let password = e.target.password.value;
            if(passwordRegex.test(password)){
                const userObj = {
                    name: e.target.name.value,
                    userName: e.target.userName.value,
                    password: e.target.password.value
                }
    
                const response = await axios.post('http://localhost:3070/signup', {userObj});
                toast(response.data.message);
                navigate('/');
            }else{
                alert('Password must contain 1 Upper case, 1 lower case, 1 number, 1 special character, and length 7 digits');
            }

        }catch(e){
            alert(e.message);
        }   
    }

    return(
        <div>
            <form className="form-register" onSubmit={e => register(e)}>
                <input name='name' type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1"/>
                <input name='userName' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                <input name='password' type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                <div className="login-button">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition= "Bounce"
            />
        </div>
    )
}

export default SignUp;