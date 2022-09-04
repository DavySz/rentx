/* eslint-disable react/require-default-props */
import React from "react";

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from "./styles";

type Props = {
    data: CarDTO;
    onPress?: () => void;
};

export function Car({ data, onPress }: Props) {
    const MotorIcon = getAccessoryIcon(data.fuel_type);
    return (
        <Container onPress={onPress}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${data.price}`}</Price>
                    </Rent>
                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>
            <CarImage
                source={{
                    uri: data.thumbnail,
                }}
                resizeMode="contain"
            />
        </Container>
    );
}
