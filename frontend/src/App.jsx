import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

const Homepage = lazy(() => import("./components/Home"));
const Homelayout = lazy(() => import("./layout/Homelayout"));
const Signup = lazy(() => import("./components/Home/Signup"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const UserLayout = lazy(() => import("./components/user/UserLayout"));
const ForgotPassword = lazy(() => import("./components/forgotPassword"));
const Dashboard = lazy(() => import("./components/shared/Dashboard"));
const Reports = lazy(() => import("./components/shared/Reports"));
const Transaction = lazy(() => import("./components/shared/Transaction"));
const AdminLayout = lazy (()=>import("./components/Admin/AdminLayout"));
const Users = lazy (()=>import("./components/shared/Users"));
const Account = lazy (()=>import("./components/shared/Account"));

const Homepagestyle = lazy(() =>
  import("./components/Home/Homepagestyle")
);
const Learnmore = lazy(() =>
  import("./learnmore/more")
);

import 'react-toastify/dist/ReactToastify.css';
import Guard from "./Guard";
import Loader from "./components/shared/loader";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepagestyle />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Learnmore" element={<Learnmore />} />

          {/* admin related route */}
          <Route path="/app/admin"
            element={<Guard
              endpoint="/api/user/session"
              role="admin"
            >
              <AdminLayout />
            </Guard>}
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="Account" element={<Account />} />
          </Route >

          {/* user related route */}
          <Route path="/app/user"
            element={<Guard
              endpoint="/api/user/session"
              role="user"
            >
              <UserLayout />
            </Guard>}
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="transactions" element={<Transaction />} />
            {/* ✅ FIXED: Added Account route for User as well */}
            <Route path="account" element={<Account />} />
          </Route >

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App;