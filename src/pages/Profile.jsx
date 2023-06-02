import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut(); //signs user out
    navigate("/"); //return user to homepage
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name, //update state
        });

        const documentReference = doc(db, "users", auth.currentUser.uid);
        await updateDoc(documentReference, {
          name: name, //update on firestore
        });
      }
    } catch (error) {
      toast.error("Could not update personal information");
    }
  };

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
    console.log("clicked me!!");
  };

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">Profile</p>
          <button className="logOut" onClick={onLogout}>
            Log out
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Information</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((previousState) => !previousState);
              }}
            >
              {changeDetails ? "done" : "change"}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                className="profileEmail"
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;

// import { getAuth } from "firebase/auth";
// import { useEffect, useState } from "react";

// function Profile() {
//   const [user, setUser] = useState(null)

//   const auth = getAuth
//   useEffect(() => {
//     setUser(auth.currentUser)
//   }, [])

//   return user ? <h1>{user.displayName}</h1> : 'No User Found'
// }

// export default Profile;
