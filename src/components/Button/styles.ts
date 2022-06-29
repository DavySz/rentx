// eslint-disable-next-line import/no-extraneous-dependencies
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type ButtonProps = {
    type: "primary" | "secondary";
};

export const Container = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})<ButtonProps>`
    width: 100%;
    padding: 19px;
    align-items: center;
    justify-content: center;

    ${({ type }) =>
        type === "primary" &&
        css`
            background-color: ${({ theme }) => theme.colors.main};
        `}
    ${({ type }) =>
        type === "secondary" &&
        css`
            background-color: ${({ theme }) => theme.colors.success};
        `}
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.shape};
`;
