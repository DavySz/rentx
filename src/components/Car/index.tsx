/* eslint-disable react/require-default-props */
import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";

import { Car as CarModel } from "../../database/model/Car";
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
    data: CarModel;
    onPress?: () => void;
};

export function Car({ data, onPress }: Props) {
    const netInfo = useNetInfo();
    const MotorIcon = getAccessoryIcon(data.fuel_type);
    return (
        <Container onPress={onPress}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>
                            {netInfo.isConnected === true
                                ? `R$ ${data.price}`
                                : "---"}
                        </Price>
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
