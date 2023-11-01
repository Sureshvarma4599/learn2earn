import styled from "styled-components";
import { colors } from "../../common/colors";
import Logo from "../../assets/logo/png/logo-no-background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, User } from "../../services/user-service";
import { toast } from "react-toastify";

const RegistrationCard = styled.div`
  width: 480px;
  height: auto;
  margin: auto;
  margin-top: 84px;
  //border: 1px solid ${colors.primary};
  border-radius: 12px;
`;
const SignupForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
    else if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastname(value);
    else console.log("null");
  };

  const createAccount = async (e: any) => {
    e.preventDefault();
    const body: User = {
      email,
      password,
      firstName,
      lastName,
    };
    console.log("body", body);
    if (password === confirmPassword) {
      const signup = await createUser(body);
      console.log("signup", signup);
      if (signup.status === 200) {
        toast.success("User Created", {
          position: "top-right", // Set the position of the toast
          autoClose: 3000, // Close the toast after 3 seconds (optional)
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        return navigate("/login");
      } else
        return toast.error(signup.response.data.error, {
          position: "top-right", // Set the position of the toast
          autoClose: 3000, // Close the toast after 3 seconds (optional)
        });
    }
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
          <form className="space-y-6" onSubmit={createAccount}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900 text-start"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={inputHandler}
                  autoComplete="firstName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900 text-start"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  onChange={inputHandler}
                  autoComplete="lastName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-start"
              >
                Email address
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={inputHandler}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={inputHandler}
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
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/login")}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </RegistrationCard>
  );
};

export default SignupForm;
