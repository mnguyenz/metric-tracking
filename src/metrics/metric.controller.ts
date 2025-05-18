import { Body, Controller, Post, Query } from '@nestjs/common';
import { MetricService } from './metric.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricEntity } from '~entities/metric.entity';

@Controller('metrics')
export class MetricController {
    constructor(private metricService: MetricService) {}

    @Post()
    createOne(@Query('userId') userId: number, @Body() createMetricDto: CreateMetricDto): Promise<MetricEntity> {
        return this.metricService.createOne(userId, createMetricDto);
    }
}
