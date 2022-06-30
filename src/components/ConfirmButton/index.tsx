import React from "react";

import { Container, Title } from "./styles";

type Props = {
    title: string;
    onPress: () => void;
};

export function ConfirmButton({ title, onPress }: Props) {
    return (
        <Container onPress={onPress}>
            <Title>{title}</Title>
        </Container>
    );
}
