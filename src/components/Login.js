import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkSignInData, checkSignUpData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG_URL, USER_ICON } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password);

    if (isSignIn) {
      const message = checkSignInData(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);

      if (message !== null) return;

      // login logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      const message = checkSignUpData(
        name.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);

      if (message !== null) return;

      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_ICON,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:h-full"
          src={BG_IMG_URL}
          alt="bg-img"
        />
      </div>
      <form
        className="absolute text-white p-12 bg-black w-full md:w-4/12 mx-auto my-36 right-0 left-0 rounded-lg opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={name}
            type="text"
            className="p-4 my-4 w-full bg-gray-700"
            placeholder="Full Name"
          ></input>
        )}
        <input
          type="text"
          ref={email}
          className="p-4 my-4 w-full bg-gray-700"
          placeholder="Email Address"
        ></input>
        <input
          type="password"
          ref={password}
          className="p-4 my-4 w-full bg-gray-700"
          placeholder="Password"
        ></input>
        <p className="text-red-700 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "New to StreamVault? Sign Up Now!"
            : "Already registered? Sign In Now!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
