// export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3003";
// export const LOGIN_URL =
//   import.meta.env.VITE_LOGIN_URL ?? "http://localhost:5173/";

// const TOKEN_KEY = "token";

// // The login app redirects here with { token, role, userId } as JSON in
// // window.name. Move the token to localStorage and always clear window.name
// // so the token doesn't stay readable by whatever page this tab opens next.
// export function saveTokenFromLogin() {
//   if (!window.name) return;

//   let handoff;
//   try {
//     handoff = JSON.parse(window.name);
//   } catch {
//     handoff = null;
//   } finally {
//     window.name = "";
//   }

//   if (handoff && handoff.token) {
//     localStorage.setItem(TOKEN_KEY, handoff.token);
//   }
// }

// export function getToken() {
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function clearToken() {
//   localStorage.removeItem(TOKEN_KEY);
// }

// // The backend reads the token from the Authorization header.
// export function authHeaders() {
//   const token = getToken();
//   if (!token) return {};
//   return { Authorization: `Bearer ${token}` };
// }

// export async function verifySession(signal) {
//   const res = await fetch(`${API_URL}/api/auth/verify`, {
//     headers: authHeaders(),
//     signal,
//   });
//   if (res.status === 401) clearToken();
//   if (!res.ok) return null;
//   const body = await res.json();
//   return body.success ? body.data.user : null;
// }

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3003";
export const LOGIN_URL =
  import.meta.env.VITE_LOGIN_URL ?? "http://localhost:5173/";

// Sirf memory mein. localStorage / sessionStorage use nahi hota.
let memoryAuth = null;

export function getAuth() {
  return memoryAuth;
}

function readAuthFromWindowName() {
  if (!window.name) return null;

  try {
    const data = JSON.parse(window.name);
    return data && data.token ? data : null;
  } catch {
    return null;
  } finally {
    // Turant clear, taaki token window.name mein na rahe
    window.name = "";
  }
}

// StrictMode mein 2 baar chal sakta hai, isliye memory pehle check karo
export function loadInitialAuth() {
  if (memoryAuth) return memoryAuth;

  const fromHandoff = readAuthFromWindowName();
  if (fromHandoff) memoryAuth = fromHandoff;

  return memoryAuth;
}

// Purane naam compatible rakhe, taaki baaki code na tute
export const saveTokenFromLogin = loadInitialAuth;

export function getToken() {
  return memoryAuth ? memoryAuth.token : null;
}

export function clearAuth() {
  memoryAuth = null;
  window.name = "";
}
export const clearToken = clearAuth;

// Backend token Authorization header se padhta hai
export function authHeaders() {
  const token = getToken();
  if (!token) return {};
  return { Authorization: "Bearer " + token };
}

export async function verifySession(signal) {
  const res = await fetch(API_URL + "/api/auth/verify", {
    headers: authHeaders(),
    signal,
  });
  if (res.status === 401) clearAuth();
  if (!res.ok) return null;
  const body = await res.json();
  return body.success ? body.data.user : null;
}

// Optional helper: har API call ke liye
export function authFetch(path, options = {}) {
  return fetch(API_URL + path, {
    ...options,
    headers: { ...(options.headers || {}), ...authHeaders() },
  });
}
