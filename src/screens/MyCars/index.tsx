/* eslint-disable import/no-extraneous-dependencies */
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";
import { Car as CarModel } from "../../database/model/Car";
import api from "../../services/api";
import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentsQuantity,
    AppointmentsTitle,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from "./styles";

type DataProps = {
    id: string;
    car: CarModel;
    start_date: string;
    end_date: string;
};

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const screenIsFocused = useIsFocused();

    const theme = useTheme();

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchCars() {
        try {
            const response = await api.get(`/rentals`);
            const dataFormatted = response.data.map((data: DataProps) => {
                return {
                    id: data.id,
                    car: data.car,
                    start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
                    end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
                };
            });
            setCars(dataFormatted);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCars();
    }, [screenIsFocused]);
    return (
        <Container>
            <Header>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="transparent"
                />
                <BackButton type="secondary" onPress={() => handleGoBack()} />
                <Title>Seus agendamentos,{"\n"} estão aqui.</Title>
                <Subtitle>Conforto, segurança e praticidade</Subtitle>
            </Header>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Appointments>
                        <AppointmentsTitle>
                            Agendamentos feitos
                        </AppointmentsTitle>
                        <AppointmentsQuantity>
                            {cars.length}
                        </AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>
                                            {item.start_date}
                                        </CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            color={theme.colors.title}
                                            size={20}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>
                                            {item.end_date}
                                        </CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            )}
        </Container>
    );
}
