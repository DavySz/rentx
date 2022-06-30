import React from "react";

import { Container, Icon } from "./styles";

type Props = {
    type: "primary" | "secondary";
};

export function BackButton({ type }: Props) {
    return (
        <Container>
            <Icon type={type} name="chevron-left" />
        </Container>
    );
}
