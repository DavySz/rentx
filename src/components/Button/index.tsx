/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

type Props = {
    color?: string;
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    light?: boolean;
};

export function Button({
    color,
    title,
    onPress,
    disabled = false,
    loading = false,
    light,
}: Props) {
    const theme = useTheme();
    return (
        <Container
            color={color || theme.colors.main}
            onPress={onPress}
            disabled={disabled}
            style={{ opacity: disabled === true || loading === true ? 0.5 : 1 }}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.shape} />
            ) : (
                <Title light={light}>{title}</Title>
            )}
        </Container>
    );
}
