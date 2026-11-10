// import { createContext, useContext, useMemo, useState } from "react";

// const LOGIN_URL = import.meta.env.VITE_LOGIN_URL || "http://localhost:5173/";

// // Sirf memory mein. Kahin save nahi hota.
// let memoryAuth = null;

// // Non-React code (authFetch.js etc.) ye use karega
// export function getAuth() {
//   return memoryAuth;
// }

// function readAuthFromWindowName() {
//   if (!window.name) return null;

//   try {
//     const data = JSON.parse(window.name);
//     // console.log(data);
//     return data?.token ? data : null;
//   } catch {
//     return null;
//   } finally {
//     // Turant clear, taaki token window.name mein na rahe
//     window.name = "";
//   }
// }

// function loadInitialAuth() {
//   // StrictMode mein ye 2 baar chal sakta hai, isliye memory pehle check karo
//   if (memoryAuth) return memoryAuth;

//   const fromHandoff = readAuthFromWindowName();
//   if (fromHandoff) memoryAuth = fromHandoff;

//   return memoryAuth;
// }

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [auth, setAuth] = useState(loadInitialAuth);

//   const logout = () => {
//     memoryAuth = null;
//     window.name = "";
//     setAuth(null);
//     window.location.replace(LOGIN_URL);
//   };

//   const value = useMemo(
//     () => ({ ...auth, isAuthenticated: !!auth?.token, logout }),
//     [auth],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { LOGIN_URL, clearAuth, loadInitialAuth } from "../lib/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadInitialAuth);

  const logout = useCallback(() => {
    clearAuth();
    setAuth(null);
    window.location.replace(LOGIN_URL);
  }, []);

  const value = useMemo(
    () => ({
      ...(auth || {}),
      isAuthenticated: !!(auth && auth.token),
      logout,
    }),
    [auth, logout],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export const useAuth = () => useContext(AuthContext);
