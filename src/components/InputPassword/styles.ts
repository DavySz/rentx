import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface IProps {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;

    margin-bottom: 8px;
`;

export const IconContainer = styled.View<IProps>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_secondary};

    margin-right: 2px;

    ${({ theme, isFocused }) =>
        isFocused &&
        css`
            border-bottom-width: 2px;
            border-bottom-color: ${theme.colors.main};
        `}
`;

export const InputText = styled(TextInput)<IProps>`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 23px;

    ${({ theme, isFocused }) =>
        isFocused &&
        css`
            border-bottom-width: 2px;
            border-bottom-color: ${theme.colors.main};
        `}
`;

export const ChangePasswordVisibilityButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})``;
