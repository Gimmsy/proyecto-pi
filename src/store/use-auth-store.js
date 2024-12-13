import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, updateDoc, getDoc,setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { usePuzzleStore } from "./use-puzzle-store";

const provider = new GoogleAuthProvider();

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      loginGoogleWithPopUp: async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          // Obtener datos adicionales del usuario de Firestore
          const userDocRef = doc(db, "users", user.uid);
          let userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            // Crea el documento con datos iniciales para evitar errores
            await setDoc(userDocRef, {
              score: 0,
              completedChallenges: 0
            });
            // Vuelve a obtener el documento después de crearlo
            userDoc = await getDoc(userDocRef);
          }
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            score: userDoc.exists() ? userDoc.data().score || 0 : 0,
            completedChallenges: userDoc.exists() ? userDoc.data().completedChallenges || 0 : 0
          };

          set({ user: userData, loading: false });

          // Inicializar datos del usuario
          const { initializeUserData } = usePuzzleStore.getState();
          if (initializeUserData) {
            await initializeUserData();
          }
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

      updateUserScore: async (scoreToAdd) => {
        try {
          const { user } = get();

          if (user && user.uid) {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
              score: (user.score || 0) + scoreToAdd,
              completedChallenges: (user.completedChallenges || 0) + 1
            });

            // Actualizar el estado local del usuario
            set((state) => ({
              user: {
                ...state.user,
                score: (state.user?.score || 0) + scoreToAdd,
                completedChallenges: (state.user?.completedChallenges || 0) + 1
              }
            }));
          }
        } catch (error) {
          console.error("Error actualizando puntaje del usuario:", error);
        }
      },

      observeAuthState: () => {
        return onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const userDocRef = doc(db, "users", user.uid);
              const userDoc = await getDoc(userDocRef);

              set({
                user: {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  score: userDoc.exists() ? userDoc.data().score || 0 : 0,
                  completedChallenges: userDoc.exists() ? userDoc.data().completedChallenges || 0 : 0
                },
                loading: false
              });

              usePuzzleStore.getState().initializeUserData();
            } catch (error) {
              console.error("Error obteniendo datos del usuario:", error);
            }
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