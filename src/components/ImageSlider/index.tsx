/* eslint-disable react/no-array-index-key */
import React from "react";
import { FlatList } from "react-native";

import {
    Container,
    ImageIndexs,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from "./styles";

type Props = {
    imagesUrl: string[];
};

export function ImageSlider({ imagesUrl }: Props) {
    return (
        <Container>
            <ImageIndexs>
                {imagesUrl.map((_, index) => (
                    <ImageIndex active key={index.toString()} />
                ))}
            </ImageIndexs>
            <FlatList
                data={imagesUrl}
                keyExtractor={(key) => key}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage source={{ uri: item }} resizeMode="contain" />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    );
}
