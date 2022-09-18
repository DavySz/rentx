/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";
import { useTheme } from "styled-components";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";
import { Car as CarModel } from "../../database/model/Car";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
    Container,
    Header,
    CarImages,
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
    OfflineInfo,
} from "./styles";

type Params = {
    car: CarModel;
};

export function CarDetails() {
    const netInfo = useNetInfo();
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as Params;
    function handleConfirmRental() {
        navigation.navigate("Scheduling", { car });
    }
    function handleGoBack() {
        navigation.goBack();
    }

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        };
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            ),
        };
    });

    async function fetchCarUpdated() {
        const response = await api.get(`/cars/${car.id}`);
        setCarUpdated(response.data);
    }

    useEffect(() => {
        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="dark-content"
            />
            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary },
                ]}
            >
                <Header>
                    <BackButton
                        type="primary"
                        onPress={() => handleGoBack()}
                        activeOpacity={0.7}
                    />
                </Header>
                <CarImages>
                    <Animated.View style={[sliderCarsStyleAnimation]}>
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
                    </Animated.View>
                </CarImages>
            </Animated.View>
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>
                            {netInfo.isConnected === true
                                ? `R$ ${car.price}`
                                : "---"}
                        </Price>
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
                <About>{car.about}</About>
            </Animated.ScrollView>
            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={() => handleConfirmRental()}
                    disabled={!netInfo.isConnected === true}
                />
                {netInfo.isConnected === false && (
                    <OfflineInfo>
                        Conecte-se a Internet para ver mais detalhes e agendar
                        seu carro
                    </OfflineInfo>
                )}
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        overflow: "hidden",
        zIndex: 1,
    },
});
