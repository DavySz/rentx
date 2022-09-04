import { ViewToken } from "react-native";

export interface IImageSlider {
    imagesUrl: {
        id: string;
        photo: string;
    }[];
}

export type TChangeImage = {
    viewableItems: ViewToken[];
    changed: ViewToken[];
};
