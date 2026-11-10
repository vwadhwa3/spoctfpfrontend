// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.jsx";
// import Cases from "./pages/Cases.jsx";
// import Directory from "./pages/Directory.jsx";
// import NewCase from "./pages/NewCase.jsx";
// import NewCasePayment from "./pages/NewCasePayment.jsx";
// import NewCaseReview from "./pages/NewCaseReview.jsx";
// import CustomerDetail from "./pages/CustomerDetail.jsx";
// import RequireAuth from "./components/auth/RequireAuth.jsx";
// import { ToastProvider } from "./components/ui/Toast.jsx";

// function App() {
//   return (
//     <ToastProvider>
//       <Routes>
//         {/* Every route requires a session verified by the backend */}
//         <Route element={<RequireAuth />}>
//           <Route path="/spoc/dashboard" element={<Dashboard />} />
//           <Route path="/spoc/cases" element={<Cases />} />
//           <Route path="/spoc/cases/new" element={<NewCase />} />
//           <Route path="/spoc/cases/new/payment" element={<NewCasePayment />} />
//           <Route path="/spoc/cases/new/review" element={<NewCaseReview />} />
//           <Route path="/spoc/directory" element={<Directory />} />
//           <Route
//             path="/spoc/directory/:customerId"
//             element={<CustomerDetail />}
//           />
//           <Route path="*" element={<Navigate to="/spoc/dashboard" replace />} />
//         </Route>
//       </Routes>
//     </ToastProvider>
//   );
// }

// export default App;

import { createElement as h } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Cases from "./pages/Cases.jsx";
import Directory from "./pages/Directory.jsx";
import NewCase from "./pages/NewCase.jsx";
import NewCasePayment from "./pages/NewCasePayment.jsx";
import NewCaseReview from "./pages/NewCaseReview.jsx";
import CustomerDetail from "./pages/CustomerDetail.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import { ToastProvider } from "./components/ui/Toast.jsx";
import { AuthProvider } from "./contexts/authContext.js";

export default function App() {
  return h(
    AuthProvider,
    null,
    h(
      ToastProvider,
      null,
      h(
        Routes,
        null,
        h(
          Route,
          { element: h(RequireAuth) },
          h(Route, { path: "/spoc/dashboard", element: h(Dashboard) }),
          h(Route, { path: "/spoc/cases", element: h(Cases) }),
          h(Route, { path: "/spoc/cases/new", element: h(NewCase) }),
          h(Route, {
            path: "/spoc/cases/new/payment",
            element: h(NewCasePayment),
          }),
          h(Route, {
            path: "/spoc/cases/new/review",
            element: h(NewCaseReview),
          }),
          h(Route, { path: "/spoc/directory", element: h(Directory) }),
          h(Route, {
            path: "/spoc/directory/:customerId",
            element: h(CustomerDetail),
          }),
          h(Route, {
            path: "*",
            element: h(Navigate, { to: "/spoc/dashboard", replace: true }),
          }),
        ),
      ),
    ),
  );
}
