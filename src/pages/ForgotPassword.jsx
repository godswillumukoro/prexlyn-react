import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("A password reset link was sent to you email address");
    } catch (error) {
      toast.error("We encountered an error");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forogt Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email address"
            id="email"
            value={email}
            onChange={onChange}
            className="emailInput"
          />
          <Link to="/sign-in" className="forgotPasswordLink">
            Sign in
          </Link>
          <div className="signInBar">
            <p className="signInText">Send Reset Link</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
