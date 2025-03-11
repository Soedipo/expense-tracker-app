import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };
  return (
    <div className="flex flex-col justify-center">
      <p className="self-center">Sign in to continue</p>
      <button className="" onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
};
