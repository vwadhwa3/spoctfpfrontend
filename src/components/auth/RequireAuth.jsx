// import { useEffect, useState } from 'react'
// import { Outlet } from 'react-router-dom'
// import { LOGIN_URL, verifySession } from '../../lib/auth.js'

// // Layout route: renders nothing until the backend confirms the session,
// // otherwise sends the user to the login app.
// export default function RequireAuth() {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const controller = new AbortController()
//     verifySession(controller.signal)
//       .then((verified) => {
//         if (verified) setUser(verified)
//         else window.location.replace(LOGIN_URL)
//       })
//       .catch((err) => {
//         if (err.name !== 'AbortError') window.location.replace(LOGIN_URL)
//       })
//     return () => controller.abort()
//   }, [])

//   if (!user) return null
//   return <Outlet context={{ user }} />
// }

import { createElement, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.js";
import { LOGIN_URL, verifySession } from "../../lib/auth.js";

export default function RequireAuth() {
  const { isAuthenticated, logout } = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Token memory mein hai hi nahi (refresh / direct open) -> login pe bhejo
    if (!isAuthenticated) {
      window.location.replace(LOGIN_URL);
      return;
    }

    const controller = new AbortController();

    verifySession(controller.signal)
      .then((user) => {
        if (controller.signal.aborted) return;
        if (user) setVerified(true);
        else logout();
      })
      .catch((err) => {
        if (err && err.name === "AbortError") return;
        logout();
      });

    return () => controller.abort();
  }, [isAuthenticated, logout]);

  if (!isAuthenticated || !verified) {
    return createElement("div", { className: "auth-loading" }, "Loading...");
  }

  return createElement(Outlet);
}
