import React from "react";
import { useWindowDimensions, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { Container, Content, Title, Message, Footer } from "./styles";

export function SchedulingComplete() {
    const { width } = useWindowDimensions();
    return (
        <Container>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="transparent"
            />
            <LogoSvg width={width} />
            <Content>
                <DoneSvg width={RFValue(80)} height={RFValue(80)} />
                <Title>Carro Alugado!</Title>
                <Message>
                    Agora você só precisa ir{"\n"}
                    até a concessionária da RENTX{"\n"}
                    pegar o seu automóvel.
                </Message>
            </Content>
            <Footer>
                <ConfirmButton title="OK" />
            </Footer>
        </Container>
    );
}
