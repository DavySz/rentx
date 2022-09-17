import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components";

import { Container, Name } from "./styles";

type Props = {
    name: string;
    icon: React.FC<SvgProps>;
};

export function Accessory({ icon: Icon, name }: Props) {
    const theme = useTheme();
    return (
        <Container>
            <Icon
                width={RFValue(32)}
                height={RFValue(32)}
                fill={theme.colors.header}
            />
            <Name>{name}</Name>
        </Container>
    );
}
