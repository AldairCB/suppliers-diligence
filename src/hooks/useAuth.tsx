import SuppliersDiligenceApi from "@/services/SuppliersDiligenceApi";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

type Props = {
    children?: ReactNode
}

type IAuthContext = {
    user: any
    login: (email: string, password: string) => Promise<void> // Assuming async login
    logout: () => void
}

const initialValues = {
    user: {},
    login: async () => {},
    logout: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValues)

export const AuthProvider = ({children}: Props) => {
    const [user, setUser] = useLocalStorage("user", null);
    const suppliersDiligenceApi = SuppliersDiligenceApi.getInstance();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        const response = await suppliersDiligenceApi.authenticate(email, password)
        setUser({email, ...response})
        navigate('/')
    }
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    }

    // useMemo Hook: This React hook is used to memoize (optimize) the creation of an object. It takes two arguments:
    // A callback function that returns the object to be memoized.
    // In this case, the callback creates an object with three properties: user, login, and logout.
    // We assume these are either functions or values related to user authentication.
    // A dependency array. This array specifies which values the memoized object depends on.
    // If any of these values change, the object will be recreated during the next render.
    // Here, the dependency array only contains user, indicating that the object should only be recalculated if the user value changes.
    const value = useMemo<IAuthContext>(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}