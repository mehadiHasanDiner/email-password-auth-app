import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSuccess(false);

    const lengthPatter = /^.{6,}$/;
    const characterPattern = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
    const specialPattern = /^(?=.*\d)(?=.*[!@#$%^&*]).+$/;

    if (!lengthPatter.test(password)) {
      console.log("password must be 6 char or long");
      setError("password must be 6 char or long ");
      return;
    } else if (!characterPattern.test(password)) {
      setError("Password must be at least on uppercase and on lowercase");
      return;
    } else if (!specialPattern.test(password)) {
      setError(
        "Password must contain at least one number and one special character"
      );
      return;
    }
    // set success or not
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    console.log(email, password);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
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
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {error && (
                <p className="text-red-600 text-center font-bold">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-center font-bold">
                  Account Created Successfully
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
