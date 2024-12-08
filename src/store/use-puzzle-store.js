import { create } from "zustand";
import { persist } from "zustand/middleware";
import UserDAO from "/src/daos/UserDAO";

export const usePuzzleStore = create(
    persist(
        (set, get) => ({
            userId: null,
            completedPuzzles: 0,
            totalTime: 0,
            bestTime: Infinity,
            currentStreak: 0,
            rewards: 0,
            lastCompletedAt: null,
            startTime: null,

            setUserId: (userId) => set({ userId }),

            startPuzzle: () => {
                const currentTime = new Date();
                set({ startTime: currentTime });
            },

            completePuzzle: async (time) => {
                const currentState = get();
                const newCompletedPuzzles = currentState.completedPuzzles + 1;
                const newTotalTime = currentState.totalTime + time;
                const newBestTime = Math.min(currentState.bestTime, time);

                const lastCompleted = currentState.lastCompletedAt;
                const isConsecutiveDay = lastCompleted
                    ? ((new Date().getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24)) <= 1
                    : false;

                const newStreak = isConsecutiveDay ? currentState.currentStreak + 1 : 1;
                const rewardMultiplier = Math.min(5, Math.floor(newStreak / 3));
                const newRewards = currentState.rewards + (100 * rewardMultiplier);

                set({
                    completedPuzzles: newCompletedPuzzles,
                    totalTime: newTotalTime,
                    bestTime: newBestTime,
                    currentStreak: newStreak,
                    rewards: newRewards,
                    lastCompletedAt: new Date(),
                });

                if (currentState.userId) {
                    const newUserData = {
                        completedPuzzles: newCompletedPuzzles,
                        totalTime: newTotalTime,
                        bestTime: newBestTime,
                        currentStreak: newStreak,
                        rewards: newRewards,
                        lastCompletedAt: new Date(),
                    };
                    await UserDAO.updateUser(currentState.userId, newUserData);
                }
            },

            resetPuzzle: () => set({
                startTime: null,
            }),

            addReward: (amount) => {
                set((state) => ({ rewards: state.rewards + amount }));
            }
        }),
        {
            name: "puzzle-progress",
            partialize: (state) => ({
                userId: state.userId,
                completedPuzzles: state.completedPuzzles,
                totalTime: state.totalTime,
                bestTime: state.bestTime,
                currentStreak: state.currentStreak,
                rewards: state.rewards,
                lastCompletedAt: state.lastCompletedAt,
            }),
        }
    )
);
