/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import {
    Container,
    IconContainer,
    InputText,
    ChangePasswordVisibilityButton,
} from "./styles";

interface IInput extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>["name"];
    value?: string;
}

export function InputPassword({ iconName, value, ...rest }: IInput) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();

    function handleChangePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    function handleInputFocused() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
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
                secureTextEntry={!isPasswordVisible}
                onFocus={() => handleInputFocused()}
                onBlur={() => handleInputBlur()}
                isFocused={isFocused}
                autoCorrect={false}
            />
            <ChangePasswordVisibilityButton
                onPress={() => handleChangePasswordVisibility()}
            >
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={24}
                        color={theme.colors.text_details}
                    />
                </IconContainer>
            </ChangePasswordVisibilityButton>
        </Container>
    );
}
