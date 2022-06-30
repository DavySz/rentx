import React from "react";

import { Container, Icon } from "./styles";

type Props = {
    type: "primary" | "secondary";
    onPress: () => void;
};

export function BackButton({ type, onPress }: Props) {
    return (
        <Container onPress={onPress}>
            <Icon type={type} name="chevron-left" />
        </Container>
    );
}
