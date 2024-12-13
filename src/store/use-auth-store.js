import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      // Inicia sesión con Google
      loginGoogleWithPopUp: async () => {
        if (get().loading) return; // Prevenir múltiples intentos simultáneos
        try {
          set({ loading: true });
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          // Verificar o inicializar datos en Firestore
          const userDocRef = doc(db, "users", user.uid);
          let userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              photoURL: user.photoURL,
              email: user.email,
              displayName: user.displayName,
              score: 0,
              totalScore: 0,
              completedChallenges: 0,
              puzzleCompleted: false, // Añadir información de finalización del puzzle
            });
            userDoc = await getDoc(userDocRef);
          }

          const userData = userDoc.data();

          set({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              score: userData.score || 0,
              totalScore: userData.totalScore || 0,
              completedChallenges: userData.completedChallenges || 0,
              puzzleCompleted: userData.puzzleCompleted || false, // Añadir información de finalización del puzzle
            },
            loading: false,
          });
        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
          set({ user: null, loading: false });
        }
      },

      // Cierra sesión
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      },

      // Actualiza puntajes y progreso en Firestore
      updateUserProgress: async (scoreToAdd, puzzleCompleted) => {
        const { user } = get();
        if (user && user.uid) {
          const userDocRef = doc(db, "users", user.uid);
          const maxScore = 500; // Limitar puntaje por prueba
          const maxTotalScore = 100; // Limitar puntaje total

          const newScore = Math.min((user.score || 0) + scoreToAdd, maxScore);
          const newTotalScore = Math.min((user.totalScore || 0) + scoreToAdd, maxTotalScore);
          const newCompletedChallenges = (user.completedChallenges || 0) + 1;

          try {
            await updateDoc(userDocRef, {
              score: newScore,
              totalScore: newTotalScore,
              completedChallenges: newCompletedChallenges,
              puzzleCompleted: puzzleCompleted || user.puzzleCompleted, // Actualizar información de finalización del puzzle
            });

            // Actualizar estado local
            set((state) => ({
              user: {
                ...state.user,
                score: newScore,
                totalScore: newTotalScore,
                completedChallenges: newCompletedChallenges,
                puzzleCompleted: puzzleCompleted || state.user.puzzleCompleted, // Actualizar información de finalización del puzzle
              },
            }));
          } catch (error) {
            console.error("Error actualizando progreso del usuario:", error);
          }
        }
      },

      // Inicializa datos de usuario desde Firestore
      initializeUserData: async () => {
        const { user } = get();
        if (user && user.uid) {
          const userDocRef = doc(db, "users", user.uid);
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({
                user: {
                  ...user,
                  score: userData.score || 0,
                  totalScore: userData.totalScore || 0,
                  completedChallenges: userData.completedChallenges || 0,
                  puzzleCompleted: userData.puzzleCompleted || false, // Añadir información de finalización del puzzle
                },
              });
            }
          } catch (error) {
            console.error("Error inicializando datos del usuario:", error);
          }
        }
      },

      // Observa cambios de estado en la autenticación
      observeAuthState: () => {
        return onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            try {
              let userDoc = await getDoc(userDocRef);
              if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                  uid: user.uid,
                  photoURL: user.photoURL,
                  email: user.email,
                  displayName: user.displayName,
                  score: 0,
                  totalScore: 0,
                  completedChallenges: 0,
                  puzzleCompleted: false, // Añadir información de finalización del puzzle
                });
                userDoc = await getDoc(userDocRef);
              }
              const userData = userDoc.data();
              set({
                user: {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  score: userData.score || 0,
                  totalScore: userData.totalScore || 0,
                  completedChallenges: userData.completedChallenges || 0,
                  puzzleCompleted: userData.puzzleCompleted || false, // Añadir información de finalización del puzzle
                },
                loading: false,
              });
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
      partialize: (state) => ({ user: state.user }), // Persistencia parcial del estado
    }
  )
);

// Inicia la observación del estado de autenticación
useAuthStore.getState().observeAuthState();

export default useAuthStore;