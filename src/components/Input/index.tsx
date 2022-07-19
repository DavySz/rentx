/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText } from "./styles";

interface IInput extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName, ...rest }: IInput) {
    const theme = useTheme();
    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_details}
                />
            </IconContainer>
            <InputText {...rest} />
        </Container>
    );
}
