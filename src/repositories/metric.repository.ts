import { Repository } from 'typeorm';
import { CustomRepository } from '~core/decorators/custom-repository.decorator';
import { MetricEntity } from '~entities/metric.entity';
import { GetMetricsChartDto } from '~metrics/dto/get-metrics-chart.dto';

@CustomRepository(MetricEntity)
export class MetricRepository extends Repository<MetricEntity> {
    async getMetricsChart(query: GetMetricsChartDto): Promise<MetricEntity[]> {
        const { type, userId, startDate, endDate } = query;
        return this.createQueryBuilder('metric')
            .distinctOn(['DATE(metric.date)'])
            .where('metric.type = :type', { type })
            .andWhere('metric.userId = :userId', { userId })
            .andWhere('metric.date BETWEEN :startDate AND :endDate', { startDate, endDate })
            .orderBy('DATE(metric.date)', 'ASC')
            .addOrderBy('metric.date', 'DESC')
            .addOrderBy('metric.createdAt', 'DESC')
            .getMany();
    }
}
