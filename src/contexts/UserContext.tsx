"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

import type { User } from "@/types/user-type";
import { useStoredUser } from "@/hooks/useStoredUser";

interface UserContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isHydrated: boolean;
  loadUser: () => User | null;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { user, setUser, isHydrated, loadUser, logout } = useStoredUser();

  const value: UserContextValue = {
    user,
    setUser,
    isHydrated,
    loadUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
