import { createContext, useEffect, useState } from "react";
import { getAccessToken, getUserLogged, putAccessToken } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();

        if (!error) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          logout();
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const login = async (token) => {
    putAccessToken(token);
    const { error, data } = await getUserLogged();
    if (!error) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const logout = () => {
    setUser(null);
    putAccessToken("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
