import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { MetricUnit, MetricUnitEnum } from '~metrics/constants/unit.constant';

export class GetMetricsByTypeDto {
    @ApiProperty({ enum: MetricTypeEnum })
    @IsEnum(MetricTypeEnum)
    @IsNotEmpty()
    type: MetricTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiPropertyOptional({ enum: MetricUnitEnum })
    @IsEnum(MetricUnitEnum)
    @IsOptional()
    unit?: MetricUnit;
}
