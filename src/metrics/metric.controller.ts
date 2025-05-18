import { Controller, Post } from '@nestjs/common';
import { MetricService } from './metric.service';

@Controller('metrics')
export class MetricController {
    constructor(private metricService: MetricService) {}

    @Post()
    async createOne() {
        await this.metricService.createOne();
    }
}
