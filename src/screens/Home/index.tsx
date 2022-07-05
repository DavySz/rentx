/* eslint-disable import/no-extraneous-dependencies */
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
    MyCarsButton,
} from "./styles";

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState<CarDTO[]>([]);
    const navigation = useNavigation();

    const theme = useTheme();

    async function fetchCars() {
        try {
            const response = await api.get("/cars");
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

    function handleCarDetails(car: CarDTO) {
        navigation.navigate("CarDetails", { car });
    }

    function handleOpenMyCars() {
        navigation.navigate("MyCars");
    }

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
                    <TotalCars>Total de {cars.length} carros</TotalCars>
                </HeaderContent>
            </Header>
            {isLoading ? (
                <Loading />
            ) : (
                <CarList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Car
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    )}
                />
            )}
            <MyCarsButton onPress={() => handleOpenMyCars()}>
                <Ionicons
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                />
            </MyCarsButton>
        </Container>
    );
}
