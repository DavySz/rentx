import { useNavigation } from "@react-navigation/native";
import React from "react";

import AccelerationSvg from "../../assets/acceleration.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import PeopleSvg from "../../assets/people.svg";
import SpeedSvg from "../../assets/speed.svg";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/Car/ImageSlider";
import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
} from "./styles";

export function CarDetails() {
    const navigation = useNavigation();
    function handleConfirmRental() {
        navigation.navigate("Scheduling");
    }
    return (
        <Container>
            <Header>
                <BackButton type="primary" />
            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={[
                        "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
                    ]}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                <Accessories>
                    <Accessory name="380Km/h" icon={SpeedSvg} />
                    <Accessory name="3.2s" icon={AccelerationSvg} />
                    <Accessory name="800 HP" icon={ForceSvg} />
                    <Accessory name="Gasolina" icon={GasolineSvg} />
                    <Accessory name="Auto" icon={ExchangeSvg} />
                    <Accessory name="2 pessoas" icon={PeopleSvg} />
                </Accessories>
                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de
                    lide indultado na praça Real Maestranza de Sevilla. É um
                    belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>
            <Footer>
                <Button
                    type="primary"
                    title="Escolher período do aluguel"
                    onPress={() => handleConfirmRental()}
                />
            </Footer>
        </Container>
    );
}
