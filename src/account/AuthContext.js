import React, { createContext, useState, useContext, useEffect } from "react";
import { store } from "../redux_components/store";
import { createUser } from "../redux_components/models/user";
import { register as registerUser } from "../redux_components/actions";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [state, setState] = useState(store.getState());
  const navigate = useNavigate();
  const users = state.user.items;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    // setIsAuthLoaded(true);
    return unsubscribe;
  }, []);

  const login = (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const register = (username, password, role = "user") => {
    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Пользователь уже существует" };
    }

    const newUser = createUser({
      id: Date.now(),
      username: username, 
      password: password, 
      role: role
    });
    
    console.log(newUser);
    store.dispatch(registerUser(newUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
