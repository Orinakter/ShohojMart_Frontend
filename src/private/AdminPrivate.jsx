import { Navigate } from "react-router";
import LoaderSipnner from "../components/common/LoaderSipnner";
import useAuth from "../hooks/useAuth"
import useUser from "../hooks/useUser";


const AdminPrivate = ({children}) => {
    const {user, loading} = useAuth();
    const {userData, userLoading} = useUser();

    if(loading || userLoading){
        return <LoaderSipnner/>
    }

    if(user && userData?.role === "admin"){
       return children
    }

  return <Navigate to={'/'}/>
}

export default AdminPrivate