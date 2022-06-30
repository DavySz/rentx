import React from "react";

import { Container, Title } from "./styles";

type Props = {
    type: "primary" | "secondary";
    title: string;
    onPress: () => void;
};

export function Button({ type, title, onPress }: Props) {
    return (
        <Container type={type} onPress={onPress}>
            <Title>{title}</Title>
        </Container>
    );
}
