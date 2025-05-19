import { DistanceUnitEnum } from '~metrics/enums/distance-unit.enum';
import { convertDistance, convertTemperature } from '~metrics/utils/convert.util';
import convert from 'convert-units';
import { faker } from '@faker-js/faker/.';
import { TemperatureUnitEnum } from '~metrics/enums/temperature-unit.enum';

describe('convertDistance', () => {
    const baseNumber = faker.number.float();
    it('should convert meter to centimeter', () => {
        const codeResult = convertDistance(baseNumber, DistanceUnitEnum.METER, DistanceUnitEnum.CENTIMETER);
        const libResullt = convert(baseNumber).from('m').to('cm');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert centimeter to meter', () => {
        const codeResult = convertDistance(baseNumber, DistanceUnitEnum.CENTIMETER, DistanceUnitEnum.METER);
        const libResullt = convert(baseNumber).from('cm').to('m');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert meter to feet', () => {
        const codeResult = convertDistance(baseNumber, DistanceUnitEnum.METER, DistanceUnitEnum.FEET);
        const libResullt = convert(baseNumber).from('m').to('ft');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert meter to inch', () => {
        const codeResult = convertDistance(baseNumber, DistanceUnitEnum.METER, DistanceUnitEnum.INCH);
        const libResullt = convert(baseNumber).from('m').to('in');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert meter to yard', () => {
        const codeResult = convertDistance(baseNumber, DistanceUnitEnum.METER, DistanceUnitEnum.YARD);
        const libResullt = convert(baseNumber).from('m').to('yd');
        expect(codeResult).toBeCloseTo(libResullt);
    });
});

describe('convertTemperature', () => {
    const baseNumber = faker.number.float();
    it('should convert °C to °F', () => {
        const codeResult = convertTemperature(baseNumber, TemperatureUnitEnum.CELSIUS, TemperatureUnitEnum.FAHRENHEIT);
        const libResullt = convert(baseNumber).from('C').to('F');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert °F to °C', () => {
        const codeResult = convertTemperature(baseNumber, TemperatureUnitEnum.FAHRENHEIT, TemperatureUnitEnum.CELSIUS);
        const libResullt = convert(baseNumber).from('F').to('C');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert °C to K', () => {
        const codeResult = convertTemperature(baseNumber, TemperatureUnitEnum.CELSIUS, TemperatureUnitEnum.KELVIN);
        const libResullt = convert(baseNumber).from('C').to('K');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert K to °C', () => {
        const codeResult = convertTemperature(baseNumber, TemperatureUnitEnum.KELVIN, TemperatureUnitEnum.CELSIUS);
        const libResullt = convert(baseNumber).from('K').to('C');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert °F to K', () => {
        const codeResult = convertTemperature(baseNumber, TemperatureUnitEnum.FAHRENHEIT, TemperatureUnitEnum.KELVIN);
        const libResullt = convert(baseNumber).from('F').to('K');
        expect(codeResult).toBeCloseTo(libResullt);
    });

    it('should convert K to °F', () => {
        const codeResult = convertTemperature(baseNumber, TemperatureUnitEnum.KELVIN, TemperatureUnitEnum.FAHRENHEIT);
        const libResullt = convert(baseNumber).from('K').to('F');
        expect(codeResult).toBeCloseTo(libResullt);
    });
});
