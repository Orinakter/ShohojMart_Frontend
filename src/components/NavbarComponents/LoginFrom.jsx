
import { useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const LoginFrom = ({setSignIn}) => {
    const navigate = useNavigate();
    const {loginUser, loading, setLoading} = useAuth()
    
    const formHandler  =async e => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      try{
       await loginUser(email, password)
       setSignIn(false)
       toast.success('Login Successfully')
       form.reset();
      }
      catch(err){
        setLoading(false)
        toast.error(err.message)
      }

    }

  return (
    <div>
      <form
      onSubmit={formHandler}
       className="">
        <div className="flex flex-col gap-4">
          {/* email */}
          <div className="w-full flex flex-col">
            <label className="mb-2">Email </label>
            <input
              type="email"
              name="email"
              className="border border-gray-400 w-full py-2 px-3 rounded-full"
              required
              placeholder="Email Address"
            />
          </div>
          {/* password */}
          <div className="w-full flex flex-col">
            <label className="mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="border border-gray-400 w-full py-2 px-3 rounded-full"
              required
              placeholder="Enter Password"
            />
          </div>
          {/* submit btn */}
          <div className="mt-2">
           <input 
           type="submit" 
           value={`${loading?'loading...':'Login'}`} 
           disabled={loading}
           className={`w-full ${loading?'disabled:cursor-not-allowed':''} py-2 px-3 cursor-pointer font-semibold text-white rounded-full bg-blue-700`} />
          </div>
        </div>
      </form>
      {/* divider */}
      <div className="divider">OR</div>
      <GoogleLogin setSignIn={setSignIn}/>
      <div className="mt-6 ">
        <p className="text-center text-sm mb-2">Don't have Account?</p>
        <button 
        onClick={()=>{
         navigate('/register')
         setSignIn(false)
        }}
        className=" hover:bg-blue-700 hover:text-white hover:border-none duration-300 cursor-pointer font-semibold border border-gray-400 w-full py-2 px-3 rounded-full">Register Now</button>
      </div>
    </div>
  );
};

export default LoginFrom;
