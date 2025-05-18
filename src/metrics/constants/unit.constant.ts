import { DistanceUnitEnum } from '../enums/distance-unit.enum';
import { TemperatureUnitEnum } from '../enums/temperature-unit.enum';

export const AllowedUnitsMap = {
    Distance: Object.values(DistanceUnitEnum),
    Temperature: Object.values(TemperatureUnitEnum)
} as const;

export const MetricUnitEnum = [...AllowedUnitsMap.Distance, ...AllowedUnitsMap.Temperature] as const;

export type MetricType = keyof typeof AllowedUnitsMap;
export type MetricUnit = (typeof MetricUnitEnum)[number];
