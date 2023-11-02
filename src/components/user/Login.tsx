import Logo from "../../assets/logo/png/logo-no-background.png";
import styled from "styled-components";
import { colors } from "../../common/colors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies, Cookies } from "react-cookie";
import {
  createUser,
  getUserAuth,
  User,
  userLogin,
} from "../../services/user-service";
import { toast } from "react-toastify";

const RegistrationCard = styled.div`
  width: 480px;
  height: auto;
  margin: auto;
  margin-top: 84px;
  //border: 1px solid ${colors.primary};
  border-radius: 12px;
`;
export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["authToken", "expiry", "appUserId"]);
  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else console.log("null");
  };

  const login = async (e: any) => {
    e.preventDefault();
    const body: User = {
      email,
      password,
    };
    console.log("body", body);

    const login = await userLogin(body);
    console.log("login", login);
    const headers = {
      Authorization: `Bearer ${login?.token}`,
    };
    const auth = await getUserAuth(headers);
    console.log("auth", auth);
    setCookie("authToken", auth.accessToken);
    setCookie("expiry", auth.exp);
    setCookie("appUserId", auth.appUserId);

    if (login) {
      toast.success("Login Success", {
        position: "top-right", // Set the position of the toast
        autoClose: 3000, // Close the toast after 3 seconds (optional)
      });
      setEmail("");
      setPassword("");
      return navigate("/");
    } else
      return toast.error("Login Failed", {
        position: "top-right", // Set the position of the toast
        autoClose: 3000, // Close the toast after 3 seconds (optional)
      });
  };
  return (
    <RegistrationCard className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-48" src={Logo} alt="Your Company" />
          {/*<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">*/}
          {/*  Sign in to your account*/}
          {/*</h2>*/}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-start"
              >
                Username/Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={inputHandler}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  onChange={inputHandler}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </RegistrationCard>
  );
}
