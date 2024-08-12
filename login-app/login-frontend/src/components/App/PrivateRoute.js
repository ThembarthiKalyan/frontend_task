import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/authOperations";

const PrivateRoute = () => {
  let auth = false;
  auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/" />
};
    
export default PrivateRoute;