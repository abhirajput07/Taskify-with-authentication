import { getCookieData } from "../utils/helperFunction.js";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const cookie = getCookieData(document.cookie);
  const isAuthenticated = cookie?.authToken;

  if (isAuthenticated) return children;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
