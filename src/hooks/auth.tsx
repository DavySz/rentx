/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext, useEffect } from "react";

import { database } from "../database";
import { User as UserModel } from "../database/model/User";
import api from "../services/api";
import {
    IAuthContextData,
    IAuthProvider,
    ISignInCredentials,
    IUser,
} from "./types";

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProvider) {
    const [data, setData] = useState<IUser>({} as IUser);

    async function SignIn({ email, password }: ISignInCredentials) {
        const response = await api.post("/sessions", {
            email,
            password,
        });
        const { user, token } = response.data;
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const userCollection = database.get<UserModel>("users");
        await database.write(async () => {
            userCollection.create((newUser) => {
                newUser.user_id = user.id;
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.driver_license = user.driver_license;
                newUser.avatar = user.avatar;
                newUser.token = token;
            });
        });

        setData({ ...user, token });
    }

    async function loadUserData() {
        const userCollection = database.get<UserModel>("users");
        const response = await userCollection.query().fetch();

        if (response.length > 0) {
            const userData = response[0]._raw as unknown as IUser;
            api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
            setData(userData);
        }
    }

    useEffect(() => {
        loadUserData();
    });

    return (
        <AuthContext.Provider value={{ user: data, signIn: SignIn }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContextData {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
