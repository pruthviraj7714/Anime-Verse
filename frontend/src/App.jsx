import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import ImagePin from "./pages/ImagePin";
import SavedPosts from "./pages/SavedPosts";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Appbar from "./components/Appbar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WithAppbar element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<WithAppbar element={<Dashboard />} />}
        />
        <Route path="/profile" element={<WithAppbar element={<Profile />} />} />
        <Route path="/edit" element={<WithAppbar element={<Edit />} />} />
        <Route path="/create" element={<WithAppbar element={<Create />} />} />
        <Route
          path="/image/:postId"
          element={<WithAppbar element={<ImagePin />} />}
        />
        <Route path="/save" element={<WithAppbar element={<SavedPosts />} />} />
      </Routes>
    </BrowserRouter>
  );
};

const WithAppbar = ({ element }) => {
  const location = useLocation();

  const isPublicRoute =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login";

  return isPublicRoute ? (
    element
  ) : (
    <>
      <Appbar />
      {element}
    </>
  );
};

export default App;
