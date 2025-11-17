"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

import { useStoredInstructor } from "@/hooks/useStoredInstructor";

export interface Instructor {
  id: string;
  email: string;
  name: string;
}

interface InstructorContextValue {
  instructor: Instructor | null;
  setInstructor: Dispatch<SetStateAction<Instructor | null>>;
  isHydrated: boolean;
  loadInstructor: () => Instructor | null;
  logoutInstructor: () => void;
}

const InstructorContext = createContext<InstructorContextValue | undefined>(
  undefined
);

interface InstructorProviderProps {
  children: ReactNode;
}

export function InstructorProvider({ children }: InstructorProviderProps) {
  const { instructor, setInstructor, isHydrated, loadInstructor, logout } =
    useStoredInstructor();

  const value: InstructorContextValue = {
    instructor,
    setInstructor,
    isHydrated,
    loadInstructor,
    logoutInstructor: logout,
  };

  return (
    <InstructorContext.Provider value={value}>
      {children}
    </InstructorContext.Provider>
  );
}

export function useInstructor() {
  const context = useContext(InstructorContext);

  if (!context) {
    throw new Error("useInstructor must be used within an InstructorProvider");
  }

  return context;
}
