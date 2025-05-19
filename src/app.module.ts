import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricModule } from '~metrics/metric.module';
import { databaseConfig, pgConfig } from '~config/database.config';
import { UserModule } from '~users/user.module';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';

const isTest = process.env.NODE_ENV === 'test';

@Module({
    imports: [!isTest ? databaseConfig : TypeOrmHelperModule.forRoot(pgConfig), MetricModule, UserModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
