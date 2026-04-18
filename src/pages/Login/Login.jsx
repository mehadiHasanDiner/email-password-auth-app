import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        e.target.reset();
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Login now</h1>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        {error && <p className="text-center text-red-700 font-bold">{error}</p>}
        {success && (
          <p className="text-center text-green-700 font-bold">
            User Logged in Successfully
          </p>
        )}

        <p className="text-center">
          New to our Website? Please{" "}
          <Link to="/register">
            <span className="text-blue-700 font-bold">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
