import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricRepository } from '~repositories/metric.repository';

@Injectable()
export class MetricService {
    constructor(private metricRepository: MetricRepository) {}

    createOne(userId: number, createMetricDto: CreateMetricDto) {
        return this.metricRepository.save({
            ...createMetricDto,
            user: { id: userId }
        });
    }
}
