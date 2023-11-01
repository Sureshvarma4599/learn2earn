import { Outlet, Navigate } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";
import moment from "moment";

const ProtectedRoute = () => {
  let access = false;
  const [cookies, setCookies] = useCookies([]);
  if (cookies && cookies.expiry > moment().unix() && cookies.authToken)
    access = true;
  return access ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
