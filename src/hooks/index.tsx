import React from "react";

import { AuthProvider } from "./auth";

interface IAppProvider {
    children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
    return <AuthProvider>{children}</AuthProvider>;
}
