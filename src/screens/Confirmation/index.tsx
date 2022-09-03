import { useRoute } from "@react-navigation/native";
import React from "react";
import { useWindowDimensions, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { Container, Content, Title, Message, Footer } from "./styles";
import { TRouteParams } from "./types";

export function Confirmation() {
    const { width } = useWindowDimensions();
    const { message, onPress, title } = useRoute().params as TRouteParams;

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
                <Title>{title}</Title>
                <Message>{message}</Message>
            </Content>
            <Footer>
                <ConfirmButton title="OK" onPress={onPress} />
            </Footer>
        </Container>
    );
}
