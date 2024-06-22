import { React, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/passwordinput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email!");
      return;
    }

    if (!password) {
      setError("Please enter Password!");
      return;
    }
    setError("");
    // SignUp API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        setError(response.data.message);
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dash");
      }
    } catch (error) {
      //error
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error ");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-centre justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-18">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              SignUp
            </button>

            <p className="text-sm text-center mt-4">
              Already have an Account ???{" "}
              <Link to="/login" className="font-medium text-primary underline">
                {" "}
                Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
