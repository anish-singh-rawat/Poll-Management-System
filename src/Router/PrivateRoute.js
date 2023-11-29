import { Navigate } from "react-router-dom";

function PrivateRoute({ login, children }) {
  if (login) {
    console.log("gjv")
    return children;
  }
  return <Navigate to="/" replace />;
}
export default PrivateRoute;
