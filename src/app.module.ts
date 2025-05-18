import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricModule } from '~metrics/metric.module';
import { databaseConfig } from '~config/database.config';
import { UserModule } from '~users/user.module';

@Module({
    imports: [databaseConfig, MetricModule, UserModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
