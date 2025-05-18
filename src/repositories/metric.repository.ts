import { Repository } from 'typeorm';
import { CustomRepository } from '~core/decorators/custom-repository.decorator';
import { MetricEntity } from '~entities/metric.entity';

@CustomRepository(MetricEntity)
export class MetricRepository extends Repository<MetricEntity> {}
