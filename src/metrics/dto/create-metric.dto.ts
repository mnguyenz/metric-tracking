import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { MetricUnit, MetricUnitEnum } from '~metrics/constants/unit.constant';
import { IsValidUnitForType } from '~metrics/validators/is-valid-unit-for-type.decorator';

export class CreateMetricDto {
    @IsNotEmpty()
    @IsEnum(MetricTypeEnum)
    type: MetricTypeEnum;

    @IsNotEmpty()
    @IsNumber()
    value: number;

    @IsNotEmpty()
    @IsEnum(MetricUnitEnum)
    @IsValidUnitForType('type', {
        message: 'Metric Unit does not match the Metric Type'
    })
    unit: MetricUnit;

    @IsNotEmpty()
    @IsDateString()
    date: string;
}
