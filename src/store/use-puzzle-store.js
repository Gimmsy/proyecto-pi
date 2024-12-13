// use-puzzle-store.js
import { create } from "zustand";
import UserDAO from "/src/daos/UserDAO";
import useAuthStore from "./use-auth-store";

const usePuzzleStore = create((set, get) => ({
    userId: null,
    score: 0,
    completedPuzzles: 0,
    totalScore: 0, // Manejo del puntaje total

    setUserId: (userId) => set({ userId }),

    initializeUserData: async () => {
        const { user } = useAuthStore.getState();
        if (user) {
            const response = await UserDAO.getUserById(user.uid);
            if (response.success) {
                const userData = response.data;
                set({
                    userId: user.uid,
                    score: userData.score || 0,
                    completedPuzzles: userData.completedPuzzles || 0,
                    totalScore: userData.totalScore || 0,
                });
            } else {
                console.error("Error cargando datos del usuario:", response.error);
                set({ userId: user.uid, score: 0, totalScore: 0 });
            }
        }
    },

    completePuzzle: async (scoreToAdd) => {
        const currentState = get();
        const maxScorePerPuzzle = 100; // Limitar puntaje máximo por puzzle
        const newScore = Math.min(currentState.score + scoreToAdd, maxScorePerPuzzle);
        const newTotalScore = currentState.totalScore + scoreToAdd;

        set({
            score: newScore,
            totalScore: newTotalScore,
            completedPuzzles: currentState.completedPuzzles + 1,
        });

        const { user } = useAuthStore.getState();
        if (user && user.uid) {
            try {
                // Actualizar Firestore con el nuevo puntaje
                await UserDAO.updateUser(user.uid, {
                    score: newScore,
                    totalScore: newTotalScore,
                    completedPuzzles: currentState.completedPuzzles + 1,
                });

                // También actualizar el puntaje en useAuthStore para que ambos stores tengan la misma información
                useAuthStore.getState().updateUserProgress(scoreToAdd);
            } catch (error) {
                console.error("Error al actualizar puntaje en Firestore:", error);
            }
        }
    },

    resetPuzzle: () =>
        set({
            score: 0,
            completedPuzzles: 0,
            totalScore: 0,
        }),
}));

export default usePuzzleStore; // Asegúrate de que esta línea esté presente
