import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getId } from "../../utils/authOperations";

function NewPassword(){
    const navigate =useNavigate();
    const location = useLocation();
    const id = getId();
    console.log('id', id);
    const confirmPassword = async(e)=>{
        try{
            e.preventDefault();
            let newPassword = e.target.newPassword.value;
            let confirmPassword = e.target.confirmPassword.value;
            if(!(newPassword === confirmPassword)){
                return alert('New Password and Confirm password should be same');
            }
            const response = await axios.put('http://localhost:3070/new-password', {password: newPassword, id: id});
            toast(response.data.message);
        }catch(e){
            alert(e.message);
        }

        navigate('/');
    }

    return(
        <div className="homepage" style={{background: '#add8e6'}}>
            <div className="form-login">
                <form onSubmit={e => confirmPassword(e)}>
                <input name='newPassword' type="password" className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1"/>
                <input name='confirmPassword' type="password" className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1"/>
                <div className="login-button">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
                </form>
            </div>
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

export default NewPassword;