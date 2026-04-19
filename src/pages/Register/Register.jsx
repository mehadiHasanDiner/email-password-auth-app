import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    console.log(email, password, terms, name, photo);

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

    if (!terms) {
      setError("Please accept our term and condition");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        e.target.reset();

        //update user profile
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(result.user, profile)
          .then((result) => {
            console.log(result);
          })
          .catch();

        // send Email verification
        sendEmailVerification(result.user).then(() => {
          alert("Please login to your email and verify your email address");
        });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  const handlePasswordOpen = (e) => {
    e.preventDefault();
    setPasswordOpen(!passwordOpen);
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
                <label className="label">User Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your name"
                  name="name"
                />
                {/* Photo Url */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Email"
                  name="photo"
                />
                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />

                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={passwordOpen ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    onClick={handlePasswordOpen}
                    className="absolute right-5 bottom-3"
                  >
                    {passwordOpen ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
                <label className="label">
                  <input name="terms" type="checkbox" className="checkbox" />
                  Accept our terms and condition
                </label>
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
            <p className="text-center">
              Already have an account? Please{" "}
              <Link to="/login">
                <span className="text-blue-700 font-bold">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
