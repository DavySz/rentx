import { Car as CarModel } from "../../database/model/Car";

/* eslint-disable @typescript-eslint/naming-convention */
export declare global {
    namespace ReactNavigation {
        export interface RootParamList {
            Splash: undefined;
            Home: undefined;
            CarDetails: {
                car: CarModel;
            };
            Scheduling: {
                car: Car;
            };
            SchedulingDetails: {
                dates: string[];
                car: CarDTO;
            };
            SignIn: undefined;
            Confirmation: {
                title: string;
                message: string;
                onPress: () => void;
            };
            MyCars: undefined;
            SignUpFirstStep: undefined;
            SignUpSecondStep: {
                user: {
                    name: string;
                    email: string;
                    driverLicense: string;
                };
            };
            Profile: undefined;
        }
    }
}
