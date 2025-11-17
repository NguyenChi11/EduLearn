"use client";

import { useCallback, useEffect, useState } from "react";

import {
  clearStoredInstructor,
  getStoredInstructor,
  setStoredInstructor,
} from "@/utils/auth-utils";
import type { Instructor } from "@/contexts/InstructorContext";

export function useStoredInstructor(autoLoad = true) {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [isHydrated, setIsHydrated] = useState(!autoLoad);

  const loadInstructor = useCallback(() => {
    const stored = getStoredInstructor();
    setInstructor(stored);
    setIsHydrated(true);
    return stored;
  }, []);

  useEffect(() => {
    if (autoLoad) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadInstructor();
    }
  }, [autoLoad, loadInstructor]);

  const logout = useCallback(() => {
    clearStoredInstructor();
    setInstructor(null);
    setIsHydrated(true);
  }, []);

  // Persist changes to localStorage when instructor changes
  useEffect(() => {
    if (!isHydrated) return;
    if (instructor) {
      setStoredInstructor(instructor);
    } else {
      clearStoredInstructor();
    }
  }, [instructor, isHydrated]);

  return { instructor, setInstructor, loadInstructor, logout, isHydrated };
}
