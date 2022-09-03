/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext } from "react";

import api from "../services/api";
import {
    IAuthContextData,
    IAuthProvider,
    IAuthState,
    ISignInCredentials,
} from "./types";

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProvider) {
    const [data, setData] = useState<IAuthState>({} as IAuthState);

    async function SignIn({ email, password }: ISignInCredentials) {
        const response = await api.post("/sessions", {
            email,
            password,
        });
        const { user, token } = response.data;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setData({ user, token });
    }

    return (
        <AuthContext.Provider value={{ user: data.user, signIn: SignIn }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContextData {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
