"use client";

import { create } from "zustand";

interface BirdFilterState {
  search: string;
  species: string;
  sex: string;
  mutation: string;
  featuredOnly: boolean;
  publicOnly: boolean;
  setSearch: (value: string) => void;
  setSpecies: (value: string) => void;
  setSex: (value: string) => void;
  setMutation: (value: string) => void;
  setFeaturedOnly: (value: boolean) => void;
  setPublicOnly: (value: boolean) => void;
  reset: () => void;
}

export const useBirdFilters = create<BirdFilterState>((set) => ({
  search: "",
  species: "",
  sex: "",
  mutation: "",
  featuredOnly: false,
  publicOnly: false,
  setSearch: (search) => set({ search }),
  setSpecies: (species) => set({ species }),
  setSex: (sex) => set({ sex }),
  setMutation: (mutation) => set({ mutation }),
  setFeaturedOnly: (featuredOnly) => set({ featuredOnly }),
  setPublicOnly: (publicOnly) => set({ publicOnly }),
  reset: () =>
    set({
      search: "",
      species: "",
      sex: "",
      mutation: "",
      featuredOnly: false,
      publicOnly: false
    })
}));
