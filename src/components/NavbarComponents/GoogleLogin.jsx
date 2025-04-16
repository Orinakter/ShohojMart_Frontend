import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import usePublicServer from "../../hooks/usePublicServer";

const GoogleLogin = ({setSignIn}) => {
  const { googleLoginUser, setLoading} = useAuth();
  const publicServer = usePublicServer();
  const date = new Date();
  
  const googleLoginHandler=async ()=>{
    try{
      const {user} = await googleLoginUser();
      console.log(user)
      const userInfo={
        name:user?.displayName,
        email: user?.email,
        date
      }
      await publicServer.post(`/users`, userInfo)
      setSignIn(false)
      toast.success('user login successfully')
     }
     catch(err){
      setLoading(false)
      toast.error(err.message)
     }
  }

  return (
    <div className="flex justify-center">
      <button
       onClick={googleLoginHandler}
       className="flex cursor-pointer justify-center border border-gray-400 w-full py-2 px-3 rounded-full items-center gap-3">
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className="font-semibold">Login With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
