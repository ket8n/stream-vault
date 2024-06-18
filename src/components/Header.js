import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LOGO_URL, USER_ICON } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when components unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img className="w-44" src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-7">
          {user.displayName && (
            <p className="p-4 font-bold text-white">Hey, {user.displayName}</p>
          )}

          <img className="w-12 h-12" src={user.photoURL} alt="user-icon"></img>

          <button className="px-2 font-bold text-white" onClick={handleSignOut}>
            (sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
