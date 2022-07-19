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
}

export function InputPassword({ iconName, ...rest }: IInput) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const theme = useTheme();

    function handleChangePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_details}
                />
            </IconContainer>
            <InputText {...rest} secureTextEntry={!isPasswordVisible} />
            <ChangePasswordVisibilityButton
                onPress={() => handleChangePasswordVisibility()}
            >
                <IconContainer>
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
