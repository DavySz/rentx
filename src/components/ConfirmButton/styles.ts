import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})`
    height: ${RFValue(56)}px;
    width: ${RFValue(80)}px;

    background-color: ${({ theme }) => theme.colors.shape_dark};

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(15)}px;
`;
