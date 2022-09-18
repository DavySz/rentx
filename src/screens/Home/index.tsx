/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { Ionicons } from "@expo/vector-icons";
import { synchronize } from "@nozbe/watermelondb/sync";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";
import { database } from "../../database";
import { Car as CarModel } from "../../database/model/Car";
import api from "../../services/api";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Home() {
    const theme = useTheme();
    const netInfo = useNetInfo();
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState<CarModel[]>([]);
    const navigation = useNavigation();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ],
        };
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const { data } = await api.get(
                    `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
                );
                const { changes, latestVersion } = data;
                return { changes, timestamp: latestVersion };
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                await api.post("/users/sync", user);
            },
        });
    }

    function handleCarDetails(car: CarModel) {
        navigation.navigate("CarDetails", { car });
    }

    function handleOpenMyCars() {
        navigation.navigate("MyCars");
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                const carCollection = await database.get<CarModel>("cars");
                const cars = await carCollection.query().fetch();

                if (isMounted) {
                    setCars(cars);
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        fetchCars();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (netInfo.isConnected === true) {
            offlineSynchronize();
        }
    }, [netInfo.isConnected]);

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
                    {!isLoading && (
                        <TotalCars>Total de {cars.length} carros</TotalCars>
                    )}
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
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: "absolute",
                            bottom: 13,
                            right: 22,
                        },
                    ]}
                >
                    <ButtonAnimated
                        onPress={() => handleOpenMyCars()}
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.main },
                        ]}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
