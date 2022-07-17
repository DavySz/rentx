import {
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";

import { Routes } from "./src/routes";
import theme from "./src/styles/theme";

export default function App() {
    SplashScreen.preventAutoHideAsync();
    const [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_500Medium,
        Archivo_600SemiBold,
        Inter_400Regular,
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    SplashScreen.hideAsync();

    return (
        <ThemeProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Routes />
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
