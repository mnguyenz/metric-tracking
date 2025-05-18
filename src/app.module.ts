import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricModule } from '~metrics/metric.module';
import { databaseConfig } from '~config/database.config';

@Module({
    imports: [databaseConfig, MetricModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
