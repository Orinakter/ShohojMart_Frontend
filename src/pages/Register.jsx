import { useEffect } from 'react';
import banner from '../assets/images/loginBanner.jpg';
import RegisterForm from '../components/authComponents/RegisterComponenets/RegisterForm';
import PageMargin from '../components/common/PageMargin';

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className='px-4'>
      <PageMargin/>
      <div className="lg:max-w-[1000px] py-10 flex gap-6 flex-col md:flex-row mx-auto">
        {/* image */}
        <div className="md:w-1/2">
          <img src={banner} alt="" className="w-full h-full" />
        </div>
        {/* form */}
        <div className="md:w-1/2">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
