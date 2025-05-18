import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { MetricUnit, MetricUnitEnum } from '~metrics/constants/unit.constant';

export class GetMetricsChartDto {
    @ApiProperty({ enum: MetricTypeEnum })
    @IsEnum(MetricTypeEnum)
    @IsNotEmpty()
    type: MetricTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiPropertyOptional()
    @IsDateString({}, { message: 'startDate must be a valid date string' })
    @IsNotEmpty()
    startDate: string;

    @ApiPropertyOptional()
    @IsDateString({}, { message: 'endDate must be a valid date string' })
    @IsNotEmpty()
    endDate: string;

    @ApiPropertyOptional({ enum: MetricUnitEnum })
    @IsEnum(MetricUnitEnum)
    @IsOptional()
    unit?: MetricUnit;
}
