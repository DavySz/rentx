import React from "react";

import { Container, Title } from "./styles";

type Props = {
    type: "primary" | "secondary";
    title: string;
};

export function Button({ type, title }: Props) {
    return (
        <Container type={type}>
            <Title>{title}</Title>
        </Container>
    );
}
