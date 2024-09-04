import "./Login.css";
import { useCallback, useEffect } from "react";
import useAuthStore from "../../store/use-auth-store";
import UserDAO from "/src/daos/UserDao";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { user, loginGoogleWithPopUp, logout, observeAuthState, loading } = useAuthStore();
    const [isUserCreated, setIsUserCreated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        observeAuthState();
    }, [observeAuthState]);

    useEffect(() => {
        if (user && isUserCreated) {
            navigate("/World"); // Redirige a la página de la escena 3D
        }
    }, [user, isUserCreated, navigate]);

    useEffect(() => {
        if (user) {
            const newUser = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            };
            UserDAO.createUser(newUser).then(result => {
                if (result.success) {
                    setIsUserCreated(true);
                } else {
                    console.error("Error al crear usuario:", result.error);
                    setIsUserCreated(false);
                }
            });
        }
    }, [user]);

    const handleLogin = useCallback(() => {
        loginGoogleWithPopUp();
    }, [loginGoogleWithPopUp]);

    const handleLogout = useCallback(() => {
        logout();
        setIsUserCreated(false);
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
