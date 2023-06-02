import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  // component level state
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // destructure from formData
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); //register user

      const user = userCredential.user; //get the user info

      updateProfile(auth.currentUser, {
        displayName: name,
      }); //update the display name

      //
      const formDataCopy = { ...formData };
      delete formDataCopy.password; //remove password from object
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy); //add user to users collection in database

      navigate("/"); //redirect to homepage
    } catch (error) {
      toast.error("There was a problem signing you in");
      console.error(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Get started</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="name"
              name=""
              id="name"
              className="nameInput"
              placeholder="Full name"
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              name=""
              id="email"
              className="emailInput"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() =>
                  setShowPassword((previousState) => !previousState)
                }
              />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google oAuth */}

          <Link to="/sign-in" className="registerLink">
            I already have an account. Sign-in
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
