import "./Login.css";
import { useCallback, useEffect } from "react";
import useAuthStore from "../../store/use-auth-store";
import UserDAO from "/src/daos/UserDAO";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loginGoogleWithPopUp, observeAuthState } =
    useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      UserDAO.createUser(newUser);
      navigate("/world");
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  return (
    <div className="container-login">
        <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;