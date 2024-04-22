import { SuppliersDiligenceApi } from "@/services/SuppliersDiligenceApi";
import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
    children?: ReactNode
}

type IAuthContext = {
    authenticated: boolean,
    setAuthenticated: (value: boolean) => void,
    accessToken: string,
    setAccessToken: (value: string) => void,
    refreshToken: string,
    setRefreshToken: (value: string) => void,
    login: (email: string, password: string) => Promise<void>; // Assuming async login
    logout: () => void;
}

const initialValues = {
    authenticated: false,
    setAuthenticated: () => {},
    accessToken: 'No access token',
    setAccessToken: () => {},
    refreshToken: 'No refresh token',
    setRefreshToken: () => {},
    login: async () => {},
    logout: () => {},
}

const AuthContext = createContext<IAuthContext>(initialValues)

const AuthProvider = ({children}: Props) => {
    const [authenticated, setAuthenticated] = useState(initialValues.authenticated)
    const [accessToken, setAccessToken] = useState(initialValues.accessToken)
    const [refreshToken, setRefreshToken] = useState(initialValues.refreshToken)

    const login = async (email: string, password: string) => {
        const suppliersDiligenceApi = new SuppliersDiligenceApi();
        const response = await suppliersDiligenceApi.authenticate(email, password)
        setAuthenticated(true)
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
    }
    const logout = () => {
        setAuthenticated(false)
        setAccessToken("")
        setRefreshToken("")
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            setAuthenticated,
            accessToken,
            setAccessToken,
            refreshToken,
            setRefreshToken,
            login,
            logout
        }}
        >{children}</AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}