import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ViewSettingsStore {
  cardSize: "small" | "large";
  toggleCardSize: () => void;
}

export const useViewSettingsStore = create<ViewSettingsStore>()(
  persist(
    (set) => ({
      cardSize: "small",
      toggleCardSize: () =>
        set((state) => ({
          cardSize: state.cardSize === "small" ? "large" : "small",
        })),
    }),
    {
      name: "umcine-view-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
