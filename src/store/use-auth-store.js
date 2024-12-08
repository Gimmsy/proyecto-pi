import { create } from "zustand";
import { persist } from "zustand/middleware"; // Para guardar el estado
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Estado inicial del usuario
      loading: true, // Estado para manejar la carga inicial

      loginGoogleWithPopUp: async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          set({ user, loading: false });
        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null });
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      },

      observeAuthState: () => {
        // Listener para cambios en el estado de autenticación
        onAuthStateChanged(auth, (user) => {
          if (user) {
            set({ user, loading: false });
          } else {
            set({ user: null, loading: false });
          }
        });
      },
    }),
    {
      name: "auth-store", // Nombre del almacenamiento persistente
      partialize: (state) => ({ user: state.user }), // Solo persistimos el usuario
    }
  )
);

// Activar el listener de estado al cargar
useAuthStore.getState().observeAuthState();

export default useAuthStore;
