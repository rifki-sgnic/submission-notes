import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import AddNote from "./pages/AddNote";
import Archives from "./pages/Archives";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/notes/:id" element={<Detail />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
