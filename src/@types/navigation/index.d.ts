import { CarDTO } from "../../dtos/CarDTO";

/* eslint-disable @typescript-eslint/naming-convention */
export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            CarDetails: {
                car: CarDTO;
            };
            Scheduling: {
                car: CarDTO;
            };
            SchedulingDetails: {
                dates: string[];
                car: CarDTO;
            };
            SchedulingComplete: undefined;
        }
    }
}
