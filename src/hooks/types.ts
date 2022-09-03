export interface IUser {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

export interface IAuthState {
    token: string;
    user: IUser;
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
    signIn: (credentials: ISignInCredentials) => Promise<void>;
}
