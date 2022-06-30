// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AnyStyledComponent } from "styled-components";
import styled, { css } from "styled-components/native";

type IconProps = {
    type: "primary" | "secondary";
};

export const Container = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})``;

export const Icon = styled(
    MaterialIcons as unknown as AnyStyledComponent
)<IconProps>`
    font-size: ${RFValue(24)}px;
    ${({ type }) =>
        type === "primary" &&
        css`
            color: ${({ theme }) => theme.colors.text};
        `}
    ${({ type }) =>
        type === "secondary" &&
        css`
            color: ${({ theme }) => theme.colors.shape};
        `}
`;
