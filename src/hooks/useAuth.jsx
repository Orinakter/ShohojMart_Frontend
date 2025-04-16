import { useContext } from "react"
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider"


const useAuth = () => {
    const contexValue = useContext(AuthContext)
    return contexValue
}

export default useAuth