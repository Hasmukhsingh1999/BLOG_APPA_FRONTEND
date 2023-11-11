import InputBox from "../components/input.component";
import { BiUser } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";

import google from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import axios from "axios";

import { Toaster, toast } from "react-hot-toast";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {
  // const authForm = useRef();
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  console.log(access_token);
  
  const userAuthThroughServer = (serverRoute, formData) => {
    axios
    .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
    .then(({ data }) => {
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred");
      }
    });
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    // formData ->
    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);
    // FORM VALIDATION

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be at least 3 letters long!");
      }
    }
    if (!email.length) {
      return toast.error("Enter Email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("Password is invalid");
    }

    userAuthThroughServer(serverRoute, formData);
  };

 

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form className="w-[80%] max-w-[400px]" id="formElement">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome Back" : "Join us today!"}
          </h1>

          {type !== "sign-in" ? (
            <InputBox
              name={"fullname"}
              type="text"
              placeholder={"Full name"}
              icon={<BiUser className="input-icon" />}
            />
          ) : (
            ""
          )}
          <InputBox
            name={"email"}
            type="text"
            placeholder={"Email"}
            icon={<MdOutlineAlternateEmail className="input-icon" />}
          />
          <InputBox
            name={"password"}
            type="password"
            placeholder={"Password"}
            icon={<MdPassword className="input-icon" />}
          />
          <button className="btn-dark center mt-14" onClick={handleSubmit}>
            {type.replace("-", " ")}
          </button>
          <div className="relative w-full items-center flex gap-2 mt-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
           
          >
            <img src={google} alt="" className="w-5" />
            conitune with google
          </button>
          {type === "sign-in" ? (
            <p className="mt-6 text-gray-800 text-xl text-center">
              Dont have an account
              <Link
                to={`/signup`}
                className="underline text-black text-xl ml-1"
              >
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-gray-800 text-xl text-center">
              Already a member
              <Link
                to={`/signin`}
                className="underline text-black text-xl ml-1"
              >
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
