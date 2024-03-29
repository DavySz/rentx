export interface IUser {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

export interface ISignInCredentials {
    email: string;
    password: string;
}

export interface IAuthProvider {
    children: React.ReactNode;
}

export interface IAuthContextData {
    user: IUser;
    loading: boolean;
    signOut: () => Promise<void>;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    updateUser: (user: IUser) => Promise<void>;
}
