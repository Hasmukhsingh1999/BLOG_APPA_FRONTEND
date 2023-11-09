import InputBox from "../components/input.component";
import { BiUser } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";

const UserAuthForm = ({ type }) => {
  return (
    <div>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
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
          <button className="btn-dark center mt-14">
            {type.replace("-", " ")}
          </button>
        </form>
      </section>
    </div>
  );
};

export default UserAuthForm;
