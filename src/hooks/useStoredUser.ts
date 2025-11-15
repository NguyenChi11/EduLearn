"use client";

import { useCallback, useEffect, useState } from "react";

import type { User } from "@/types/user-type";
import { clearStoredUser, getStoredUser } from "@/utils/auth-utils";

export function useStoredUser(autoLoad = true) {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(!autoLoad);

  const loadUser = useCallback(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setIsHydrated(true);
    return storedUser;
  }, []);

  useEffect(() => {
    if (autoLoad) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUser();
    }
  }, [autoLoad, loadUser]);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
    setIsHydrated(true);
  }, []);

  return { user, setUser, loadUser, logout, isHydrated };
}
