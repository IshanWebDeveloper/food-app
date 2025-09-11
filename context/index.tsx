import { SignInRequest, useUserSignIn } from "@/hooks/api/auth/useSignIn";
import { SignOutRequest, useUserSignOut } from "@/hooks/api/auth/useSignOut";
import { User } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

export interface Session {
  isAuthenticated: boolean;

  user?: User;
}

interface SessionContextProps {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
  handleSignIn: (data: SignInRequest) => void;
  handleSignOut: (data: SignOutRequest) => void;
}

const defaultSession: Session = {
  isAuthenticated: false,
};

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session>(defaultSession);
  const { signIn } = useUserSignIn();
  const { signOut } = useUserSignOut();
  const handleSignIn = async (data: SignInRequest) => {
    try {
      const response = await signIn(data);
      setSession({ isAuthenticated: true, user: response.data.data.user });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async (data: SignOutRequest) => {
    try {
      await signOut(data);
      setSession(defaultSession);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ session, setSession, handleSignIn, handleSignOut }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
