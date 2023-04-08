import React, { useContext, useState, useEffect } from "react"

import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"


const AuthContext = React.createContext(null)

export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const history = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
      history('/')
    })
  }, [user, history])

  const value = { user }

  return (
    
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
    
  )
}