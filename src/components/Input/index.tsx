/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText } from "./styles";

interface IInput extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>["name"];
    value?: string;
}

export function Input({ iconName, value, ...rest }: IInput) {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocused() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container isFocused={isFocused}>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={
                        isFocused || isFilled
                            ? theme.colors.main
                            : theme.colors.text_details
                    }
                />
            </IconContainer>
            <InputText
                {...rest}
                onFocus={() => handleInputFocused()}
                onBlur={() => handleInputBlur()}
            />
        </Container>
    );
}
