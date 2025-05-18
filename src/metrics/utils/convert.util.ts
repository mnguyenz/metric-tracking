import { DistanceUnitEnum } from '~metrics/enums/distance-unit.enum';
import { MetricTypeEnum } from '../enums/metric-type.enum';
import { TemperatureUnitEnum } from '~metrics/enums/temperature-unit.enum';

export function convertMetricUnit(type: MetricTypeEnum, value: number, from: string, to: string): number {
    if (from === to) return value;

    switch (type) {
        case MetricTypeEnum.DISTANCE:
            return convertDistance(value, from as DistanceUnitEnum, to as DistanceUnitEnum);
        case MetricTypeEnum.TEMPERATURE:
            return convertTemperature(value, from as TemperatureUnitEnum, to as TemperatureUnitEnum);
        default:
            throw new Error(`Unsupported Metric: ${type}`);
    }
}

export function convertDistance(value: number, from: DistanceUnitEnum, to: DistanceUnitEnum): number {
    const toMeter = {
        [DistanceUnitEnum.METER]: 1,
        [DistanceUnitEnum.CENTIMETER]: 0.01,
        [DistanceUnitEnum.INCH]: 0.0254,
        [DistanceUnitEnum.FEET]: 0.3048,
        [DistanceUnitEnum.YARD]: 0.9144
    };

    const fromInMeters = value * toMeter[from];
    return fromInMeters / toMeter[to];
}

function convertTemperature(value: number, from: TemperatureUnitEnum, to: TemperatureUnitEnum): number {
    const toCelsius = {
        [TemperatureUnitEnum.CELSIUS]: (v: number) => v,
        [TemperatureUnitEnum.FAHRENHEIT]: (v: number) => (v - 32) * (5 / 9),
        [TemperatureUnitEnum.KELVIN]: (v: number) => v - 273.15
    };

    const fromCelsius = {
        [TemperatureUnitEnum.CELSIUS]: (v: number) => v,
        [TemperatureUnitEnum.FAHRENHEIT]: (v: number) => v * (9 / 5) + 32,
        [TemperatureUnitEnum.KELVIN]: (v: number) => v + 273.15
    };

    const celsius = toCelsius[from](value);
    return fromCelsius[to](celsius);
}
