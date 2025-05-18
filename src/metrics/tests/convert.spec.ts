import { DistanceUnitEnum } from '~metrics/enums/distance-unit.enum';
import { convertDistance } from '~metrics/utils/convert.util';

describe('convertDistance', () => {
    it('should convert meters to feet', () => {
        const result = convertDistance(1, DistanceUnitEnum.METER, DistanceUnitEnum.FEET);
        expect(result).toBeCloseTo(3.2808, 4);
    });
});
