import React, { useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: User) => {
      setUser(user);
      setLoading(false);
    });
  }, [user]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
