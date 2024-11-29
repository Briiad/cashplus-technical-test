"use client";

import { createContext, useContext } from "react";
import { useGetCurrentUser } from "@/app/api/queries";
import { CurrentUser } from "@/services/Auth.service";

type UserContextType = {
  user: CurrentUser | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userQuery = useGetCurrentUser();

  return (
    <UserContext.Provider
      value={{ user: userQuery.data ?? null, isLoading: userQuery.isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUser = useContext(UserContext);
  if (!currentUser) {
    throw new Error("useCurrentUser must be used inside a UserProvider");
  }

  return currentUser;
};