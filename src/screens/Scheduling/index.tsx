/* eslint-disable react/jsx-no-bind */
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useState } from "react";
import { StatusBar } from "react-native";

import ArrowSvg from "../../assets/arrow.svg";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, MarkedDateProps } from "../../components/Calendar";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { CarDTO } from "../../dtos/CarDTO";
import { getPlatformDate } from "../../utils/getPlatformDate";
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

type RentalPeriod = {
    startFormatted: string;
    endFormatted: string;
};

type Params = {
    car: CarDTO;
};

export function Scheduling() {
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
        {} as DayProps
    );
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
        {} as MarkedDateProps
    );
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
        {} as RentalPeriod
    );
    function handleConfirmRental() {
        navigation.navigate("SchedulingDetails", {
            car,
            dates: Object.keys(markedDates),
        });
    }
    function handleGoBack() {
        navigation.goBack();
    }
    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const startDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(
                getPlatformDate(new Date(startDate)),
                "dd/MM/yyyy"
            ),
            endFormatted: format(
                getPlatformDate(new Date(endDate)),
                "dd/MM/yyyy"
            ),
        });
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
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>
                    <ArrowSvg />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>
            <Footer>
                <Button
                    title="Confirmar"
                    onPress={() => handleConfirmRental()}
                    disabled={!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    );
}
