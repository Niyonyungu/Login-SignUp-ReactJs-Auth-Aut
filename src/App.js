import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import FooterBottom from "./components/home/Footer/FooterBottom";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Home from "./pages/Home/Home";
import Users from "./pages/Details/Users";
import EditUser from "./pages/Details/EditUser";

const Layout = () => {
  return (
    <div>
      <HeaderBottom />
      <Outlet />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/userdetails" element={<Users />}></Route>
        <Route path="/edituser/:id" element={<EditUser />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
