import InputBox from "../components/input.component";
import { BiUser } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";

import google from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useRef } from "react";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // formData ->
    let form = new FormData(authForm.current);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);
    // FORM VALIDATION

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let { fullname, email, password } = formData;

    if(fullname){
      if (fullname.length < 3) {
        return console.log({
          error: "Fullname must be at least 3 letters long!",
        });
      }
  
    }
    if (!email.length) {
      return console.log({ error: "Enter Email" });
    }

    if (!emailRegex.test(email)) {
      return console.log({ error: "Email is invalid" });
    }

    if (!passwordRegex.test(password)) {
      return console.log({ error: "Password is invalid" });
    }
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]" ref={authForm}>
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
          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
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
