import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { MetricUnit, MetricUnitEnum } from '~metrics/constants/unit.constant';
import { IsValidUnitForType } from '~metrics/validators/is-valid-unit-for-type.decorator';

export class GetMetricsChartDto {
    @ApiProperty({ enum: MetricTypeEnum })
    @IsEnum(MetricTypeEnum)
    @IsNotEmpty()
    type: MetricTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsDateString({}, { message: 'startDate must be a valid date string' })
    @IsNotEmpty()
    startDate: string;

    @ApiProperty()
    @IsDateString({}, { message: 'endDate must be a valid date string' })
    @IsNotEmpty()
    endDate: string;

    @IsValidUnitForType('type', {
        message: 'Metric Unit does not match the Metric Type'
    })
    @ApiPropertyOptional({ enum: MetricUnitEnum })
    @IsEnum(MetricUnitEnum)
    @IsOptional()
    unit?: MetricUnit;
}
