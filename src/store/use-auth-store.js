import { create } from "zustand";
import { persist } from "zustand/middleware";
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
      user: null,
      loading: true,

      loginGoogleWithPopUp: async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          set({ user, loading: false });
        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
          set({ user: null, loading: false });
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      },

      observeAuthState: () => {
        return onAuthStateChanged(auth, (user) => {
          if (user) {
            set({
              user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
              },
              loading: false
            });
          } else {
            set({ user: null, loading: false });
          }
        });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user
      }),
    }
  )
);

// Iniciar observación del estado de autenticación
useAuthStore.getState().observeAuthState();

export default useAuthStore;