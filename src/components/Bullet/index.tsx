import React from "react";

import { Container } from "./styles";
import { IBulletProps } from "./types";

export function Bullet({ active = false }: IBulletProps) {
    return <Container active={active} />;
}
