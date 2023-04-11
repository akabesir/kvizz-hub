import React, { useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setLoading(false);
    });
  }, [user]);

  const value = { user };

  return (
    <AuthContext.Provider value={value.user}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
