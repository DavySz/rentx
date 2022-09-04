/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from "react";
import { FlatList } from "react-native";

import { Bullet } from "../Bullet";
import { Container, ImageIndexs, CarImageWrapper, CarImage } from "./styles";
import { IImageSlider, TChangeImage } from "./types";

export function ImageSlider({ imagesUrl }: IImageSlider) {
    const [imageIndex, setImageIndex] = useState(0);
    const indexChanged = useRef((info: TChangeImage) => {
        const { index } = info.viewableItems[0];
        setImageIndex(index);
    });

    return (
        <Container>
            <ImageIndexs>
                {imagesUrl.map((item, index) => (
                    <Bullet key={item.id} active={index === imageIndex} />
                ))}
            </ImageIndexs>
            <FlatList
                data={imagesUrl}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                        />
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
