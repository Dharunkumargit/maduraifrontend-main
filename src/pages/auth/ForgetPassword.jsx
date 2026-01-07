import { useNavigate } from "react-router";
import LOGO from "../../assets/images/MaduraiLogo.png";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    
  };

  return (
    <>
      <div className="relative font-roboto-flex flex flex-col justify-center items-center gap-6 bg-light-blue h-screen">
        <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center py-4">
            <div>
              <img src={LOGO} alt="Logo" className="w-23" />
            </div>
            <p className="text-2xl font-semibold text-center my-4 mr-6">
              Forgot Password?
            </p>
          </div>

          <form className="mx-4 mt-4" onSubmit={handleForgot}>
            <label className="grid font-semibold mb-5">
              Email ID
              <input
                type="email"
                // onChange={(e) => setEmail(e.target.value)}
                className="border-2 dark:border-overall_bg-dark border-[#D0D6FF] outline-none rounded-md py-2 px-2 my-1"
                
              />
            </label>

            <button
              type="submit"
              className="cursor-pointer bg-darkest-blue text-white text-center w-full py-2 my-3 rounded-md text-lg font-semibold transition duration-200"
            >
              Send Email
            </button>
          </form>

          <p
            onClick={() => navigate("/")}
            className="text-center cursor-pointer text-sm py-4 hover:underline"
          >
            Back to Login
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;