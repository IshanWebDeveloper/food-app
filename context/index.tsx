import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Session {
  isAuthenticated: boolean;
  user?: {
    id: string;
    name: string;
  };
}

interface SessionContextProps {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

const defaultSession: Session = {
  isAuthenticated: false,
};

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session>(defaultSession);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
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
