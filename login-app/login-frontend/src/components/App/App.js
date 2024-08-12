import '../../App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import SignUp from '../SignUp/SignUp.js';
import Login from '../Login/Login.js';
import PrivateRoute from './PrivateRoute.js';
import Dashboard from '../Dashboard/Dashboard.js';
import ChangePassword from '../ChangePassword/ChangePassword.js';
import NewPassword from '../NewPassword/NewPassword.js';
function App() {
  return (
    <Router>
        <Routes>
            <Route exact path='/register' element={<SignUp/>}/>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/change' element={<ChangePassword/>}/>
            <Route exact path='/new-password' element={<NewPassword/>}/>
            <Route exact path='/dashboard' element={<PrivateRoute/>}>
              <Route exact path='/dashboard' element={<Dashboard/>}/>
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
