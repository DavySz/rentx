import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";

import ArrowSvg from "../../assets/arrow.svg";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from "./styles";

export function Scheduling() {
    const navigation = useNavigation();
    function handleConfirmRental() {
        navigation.navigate("SchedulingDetails");
    }
    function handleGoBack() {
        navigation.goBack();
    }
    return (
        <Container>
            <Header>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="transparent"
                />
                <BackButton type="secondary" onPress={() => handleGoBack()} />
                <Title>
                    Escolha uma{"\n"}
                    data de início e{"\n"}
                    fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>
                    <ArrowSvg />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar />
            </Content>
            <Footer>
                <Button
                    title="Confirmar"
                    type="primary"
                    onPress={() => handleConfirmRental()}
                />
            </Footer>
        </Container>
    );
}
