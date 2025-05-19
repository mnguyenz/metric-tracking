import { Module } from '@nestjs/common';
import { MetricService } from './services/metric.service';
import { MetricController } from './controllers/metric.controller';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';
import { MetricRepository } from '~repositories/metric.repository';

@Module({
    imports: [TypeOrmHelperModule.forCustomRepository([MetricRepository])],
    controllers: [MetricController],
    providers: [MetricService],
    exports: []
})
export class MetricModule {}
