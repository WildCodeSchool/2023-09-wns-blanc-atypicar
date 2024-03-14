import { User } from "../types/user";
import React from "react";



export const AuthContext = React.createContext<{ authenticated: boolean, setAuthenticated: (auth: boolean) => void, currentUser: User | null, setCurrentUser: (user: any) => void }>({
  authenticated: false,
  setAuthenticated: (auth: boolean) => { },
  currentUser: null,
  setCurrentUser: (user: any) => { }
});

