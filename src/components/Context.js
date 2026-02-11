import { createContext } from "react";

const LoginContext = createContext({
    isLoggedIn: false,
    user: null,
});

export const ThemeContext = createContext()
export default LoginContext;