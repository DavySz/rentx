import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type Props = {
    active: boolean;
};

export const Container = styled.View<Props>`
    width: ${RFValue(6)}px;
    height: ${RFValue(6)}px;

    background-color: ${({ theme, active }) =>
        active ? theme.colors.title : theme.colors.shape};

    margin-left: 8px;
    border-radius: 3px;
`;
