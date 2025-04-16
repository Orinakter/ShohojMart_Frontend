import React, { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import usePublicServer from "../../../hooks/usePublicServer";
import { UtilitesContext } from "../../../context/UtilitesProvider";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const { registerUser, loading, setLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const publicServer = usePublicServer()
  const {setSignIn} = useContext(UtilitesContext)

  const fromHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const date = new Date();
    const userInfo = {
      name,
      email,
      date,
    }

    try {
      const {data} = await publicServer.post(`/users`, userInfo)
      if(!data?.status){
       Swal.fire("User already exist! plz login");; 
       navigate('/')
       setSignIn(true)
       return
      }
      await registerUser(email, password);
      await updateUserProfile(name, '')
      toast.success('User Registration Success Fully')
      navigate('/')
      form.reset();
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3">
        Create account
      </h1>
      <p className="text-sm mb-4">Please register below to create an account</p>
      <form onSubmit={fromHandler} className="">
        <div className="flex flex-col gap-6">
          {/* name */}
          <div className="w-full flex flex-col">
            <label className="mb-2">Your Name </label>
            <input
              type="text"
              name="name"
              className="border border-gray-400 w-full py-2 px-3 rounded-full"
              required
              placeholder="Full Name"
            />
          </div>
          {/* email */}
          <div className="w-full flex flex-col">
            <label className="mb-2">Your Email </label>
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
            <label className="mb-2">Your Password</label>
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
              value={`${loading ? "loading..." : "Create Account"}`}
              className={`w-full py-2 px-3 ${loading?"disabled:cursor-not-allowed":''} cursor-pointer font-semibold text-white rounded-full 
                bg-blue-700 `}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
