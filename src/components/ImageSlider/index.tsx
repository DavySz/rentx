/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

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

type ChangeImageProps = {
    viewableItems: ViewToken[];
    changed: ViewToken[];
};

export function ImageSlider({ imagesUrl }: Props) {
    const [imageIndex, setImageIndex] = useState(0);
    const indexChanged = useRef((info: ChangeImageProps) => {
        const { index } = info.viewableItems[0];
        setImageIndex(index);
    });

    return (
        <Container>
            <ImageIndexs>
                {imagesUrl.map((_, index) => (
                    <ImageIndex
                        active={index === imageIndex}
                        key={index.toString()}
                    />
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
                onViewableItemsChanged={indexChanged.current}
                pagingEnabled
            />
        </Container>
    );
}
