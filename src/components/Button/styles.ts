// eslint-disable-next-line import/no-extraneous-dependencies
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type ButtonContainerProps = {
    color: string;
};

type ButtonTextProps = {
    light: boolean;
};

export const Container = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})<ButtonContainerProps>`
    width: 100%;
    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};

    margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme, light }) =>
        light ? theme.colors.header : theme.colors.shape};
`;
