import { create } from "zustand";
import { persist } from "zustand/middleware";
import UserDAO from "/src/daos/UserDAO";
import useAuthStore from "./use-auth-store";

export const usePuzzleStore = create(
    persist(
        (set, get) => ({
            userId: null,
            score: 0,
            completedPuzzles: 0,

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
                        });
                    } else {
                        console.error("Error cargando datos del usuario:", response.error);
                        set({ userId: user.uid, score: 0 });
                    }
                }
            },

            completePuzzle: async (scoreToAdd) => {
                const currentState = get();
                const newScore = currentState.score + scoreToAdd;
                const newCompletedPuzzles = currentState.completedPuzzles + 1;

                set({
                    score: newScore,
                    completedPuzzles: newCompletedPuzzles,
                });

                if (currentState.userId) {
                    const newUserData = {
                        score: newScore,
                        completedPuzzles: newCompletedPuzzles,
                    };

                    try {
                        await UserDAO.updateUser(currentState.userId, newUserData);
                    } catch (error) {
                        console.error("Error al actualizar puntaje en Firestore:", error);
                    }
                }
            },

            resetPuzzle: () => set({
                score: 0,
                completedPuzzles: 0,
            }),
        }),
        {
            name: "puzzle-progress",
            partialize: (state) => ({
                userId: state.userId,
                score: state.score,
                completedPuzzles: state.completedPuzzles,
            }),
        }
    )
);

export default usePuzzleStore;
