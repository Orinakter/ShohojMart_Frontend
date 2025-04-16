import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react"
import { createContext } from "react"
import { auth } from "../FirebaseConfig/firebase.config";
import usePublicServer from "../../hooks/usePublicServer";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const publicServer = usePublicServer();


    const registerUser = (email, password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password)=>{
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo)=>{
       return updateProfile(auth.currentUser, {
         displayName:name, photoURL:photo
       })
    }

    const googleLoginUser = ()=>{
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
     const unSubscribe = onAuthStateChanged(auth, async(currentUser)=>{
        setUser(currentUser);
        if(currentUser){
          const user={
            email: currentUser?.email,
            name: currentUser?.displayName
          }
          await publicServer.post('/jwt', user, {withCredentials:true})
        }
        else{
          await publicServer.post('/logout', {}, {withCredentials:true})
        }
        setLoading(false)
     })
    
     return ()=> unSubscribe()
    }, [publicServer])

    const logOutUser = ()=>{
      setLoading(false)
      return signOut(auth)
    }
   
    const authInfo = {
        user,
        loading,
        registerUser,
        loginUser,
        updateUserProfile,
        logOutUser,
        setLoading,
        googleLoginUser
    }

  return (
    <AuthContext.Provider value={authInfo}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider