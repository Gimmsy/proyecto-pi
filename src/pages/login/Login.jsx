import "./Login.css";
import { useCallback, useEffect } from "react";
import useAuthStore from "../../store/use-auth-store";
import UserDAO from "/src/daos/UserDAO";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loginGoogleWithPopUp, logout, observeAuthState, loading } =
    useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);


  const handleLogin = useCallback(() => {
    //navigate("/world");
    loginGoogleWithPopUp().then((result)=>{

      console.log(result);
      
     
        const newUser = {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        };
        UserDAO.createUser(newUser);
        
      
    })

  }, [loginGoogleWithPopUp, user, UserDAO]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (loading) {
    return <p className="loading-text">Cargando...</p>;
  }

  return (
    <div className="container-login">
      {user ? (
        <>
          <p className="welcome-text">Bienvenido, {user.displayName}</p>
          <button className="button-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
};


export default Login;
