import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Container, Header, TotalCars, HeaderContent } from "./styles";

export function Home() {
    const carDataOne = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "Ao dia",
            price: 120,
        },
        thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
    };
    const carDataTwo = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "Ao dia",
            price: 120,
        },
        thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
    };
    return (
        <Container>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="transparent"
            />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    <TotalCars>Total de 12 carros</TotalCars>
                </HeaderContent>
            </Header>
            <Car data={carDataOne} />
            <Car data={carDataTwo} />
        </Container>
    );
}
