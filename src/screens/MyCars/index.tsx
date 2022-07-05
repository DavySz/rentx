/* eslint-disable import/no-extraneous-dependencies */
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";
import { CarDTO } from "../../dtos/CarDTO";
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

type CarProps = {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
};

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const theme = useTheme();

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchCars() {
        try {
            const response = await api.get(`/schedules_byuser?user_id=2`);
            setCars(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCars();
    }, []);
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
                                            {item.startDate}
                                        </CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            color={theme.colors.title}
                                            size={20}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>
                                            {item.endDate}
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
