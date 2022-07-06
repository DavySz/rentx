/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

type Props = {
    type: "primary" | "secondary";
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export function Button({
    type,
    title,
    onPress,
    disabled = false,
    loading = false,
}: Props) {
    const theme = useTheme();
    return (
        <Container
            type={type}
            onPress={onPress}
            disabled={disabled}
            style={{ opacity: disabled === true || loading === true ? 0.5 : 1 }}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.shape} />
            ) : (
                <Title>{title}</Title>
            )}
        </Container>
    );
}
