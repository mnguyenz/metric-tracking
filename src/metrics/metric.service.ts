import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricRepository } from '~repositories/metric.repository';
import { MetricEntity } from '~entities/metric.entity';
import { convertMetricUnit } from './utils/convert.util';
import { GetMetricsByTypeDto } from './dto/get-metrics-by-type.dto';
import { GetMetricsChartDto } from './dto/get-metrics-chart.dto';

@Injectable()
export class MetricService {
    constructor(private metricRepository: MetricRepository) {}

    createOne(userId: number, createMetricDto: CreateMetricDto) {
        return this.metricRepository.save({
            ...createMetricDto,
            userId
        });
    }

    async getMetricsByType(query: GetMetricsByTypeDto): Promise<MetricEntity[]> {
        const { type, userId, unit } = query;
        const metrics = await this.metricRepository.find({ where: { type, userId } });

        if (unit) {
            return metrics.map((metric) => ({
                ...metric,
                value: convertMetricUnit(type, metric.value, metric.unit, unit),
                unit
            }));
        }

        return metrics;
    }

    async getMetricsChart(query: GetMetricsChartDto) {
        const metrics = await this.metricRepository.getMetricsChart(query);

        if (query.unit) {
            return metrics.map((metric) => ({
                ...metric,
                value: convertMetricUnit(query.type, metric.value, metric.unit, query.unit),
                unit: query.unit
            }));
        }

        return metrics;
    }
}
