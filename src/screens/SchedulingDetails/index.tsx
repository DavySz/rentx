/* eslint-disable import/no-extraneous-dependencies */
import { Feather } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from "./styles";

type Params = {
    car: CarDTO;
    dates: string[];
};

type RentalPeriod = {
    start: string;
    end: string;
};

export function SchedulingDetails() {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
        {} as RentalPeriod
    );
    const [loading, setLoading] = useState(false);
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const theme = useTheme();
    const route = useRoute();
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

    function handleNextScreen() {
        navigation.navigate("Home");
    }

    async function handleConfirmRental() {
        setLoading(true);

        await api
            .post("/rentals", {
                user_id: 1,
                car_id: car.id,
                start_date: new Date(dates[0]),
                end_date: new Date(dates[dates.length - 1]),
                total: rentTotal,
            })
            .then(() =>
                navigation.navigate("Confirmation", {
                    message: `Agora você só precisa ir\n
                até a concessionária da RENTX\n
                pegar o seu automóvel.`,
                    title: "Carro Alugado!",
                    onPress: () => handleNextScreen(),
                })
            )
            .catch(() => {
                setLoading(false);
                Alert.alert("Não foi possível confirmar o agendamento");
            });
    }

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchCarUpdated() {
        const response = await api.get(`/cars/${car.id}`);
        setCarUpdated(response.data);
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
            end: format(
                getPlatformDate(new Date(dates[dates.length - 1])),
                "dd/MM/yyyy"
            ),
        });
    }, []);

    useEffect(() => {
        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <Header>
                <BackButton type="primary" onPress={() => handleGoBack()} />
            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={
                        carUpdated.photos
                            ? carUpdated.photos
                            : [
                                  {
                                      id: car.thumbnail,
                                      photo: car.thumbnail,
                                  },
                              ]
                    }
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                {carUpdated.accessories && (
                    <Accessories>
                        {carUpdated.accessories.map((accessory) => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))}
                    </Accessories>
                )}
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>
                            R$ {car.price} x{dates.length} diárias
                        </RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button
                    color={theme.colors.success}
                    title="Alugar agora"
                    onPress={() => handleConfirmRental()}
                    disabled={loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}
