import { Navigate } from "react-router";
import LoaderSipnner from "../components/common/LoaderSipnner";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UtilitesContext } from "../context/UtilitesProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { setSignIn } = useContext(UtilitesContext);

  if (loading) {
    return <LoaderSipnner />;
  }

  if (!user) {
    setSignIn(true);
    setTimeout(() => {
      Swal.fire({
        title: "You need to login First",
        icon: "error",
        draggable: true,
      });
    }, 200);
  }

  if (user) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
