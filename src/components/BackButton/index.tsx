/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon } from "./styles";

type Props = TouchableOpacityProps & {
    type: "primary" | "secondary";
};

export function BackButton({ type, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Icon type={type} name="chevron-left" />
        </Container>
    );
}
