import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MetricService } from '../services/metric.service';
import { CreateMetricDto } from '../dto/create-metric.dto';
import { MetricEntity } from '~entities/metric.entity';
import { GetMetricsByTypeDto } from '../dto/get-metrics-by-type.dto';
import { GetMetricsChartDto } from '../dto/get-metrics-chart.dto';

@Controller('metrics')
export class MetricController {
    constructor(private metricService: MetricService) {}

    @Post()
    createOne(@Query('userId') userId: number, @Body() createMetricDto: CreateMetricDto): Promise<MetricEntity> {
        return this.metricService.createOne(userId, createMetricDto);
    }

    @Get('get-by-type')
    getMetricsByType(@Query() query: GetMetricsByTypeDto) {
        return this.metricService.getMetricsByType(query);
    }

    @Get('/chart')
    getMetricsChart(@Query() query: GetMetricsChartDto) {
        return this.metricService.getMetricsChart(query);
    }
}
