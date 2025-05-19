import { INestApplication, Type } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import request, { CallbackHandler } from 'supertest';
import { AppModule } from '~app.module';
import { databaseConfig, pgConfig } from '~config/database.config';
import './suppertest.helper';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';
import { MetricRepository } from '~repositories/metric.repository';
import { UserRepository } from '~repositories/user.repository';

export class TestHelper {
    public app: INestApplication;
    public httpService: any;
    public moduleFixture: TestingModule;
    private testHelperModules: { [_: string]: any } = {};

    async initialize(overrideBuilder?: (builder: TestingModuleBuilder) => TestingModuleBuilder): Promise<void> {
        let moduleBuilder = Test.createTestingModule({
            imports: [AppModule, TypeOrmHelperModule.forCustomRepository([MetricRepository, UserRepository])]
        });
        if (overrideBuilder) {
            moduleBuilder = overrideBuilder(moduleBuilder);
        }
        this.moduleFixture = await moduleBuilder.compile();

        this.app = this.moduleFixture.createNestApplication();

        await this.app.init();
        this.httpService = this.app.getHttpServer();
    }

    getTestHelperModule<T>(testHelperModule: new (t: TestHelper) => T): T {
        if (!this.testHelperModules[testHelperModule.name]) {
            this.testHelperModules[testHelperModule.name] = new testHelperModule(this);
        }
        return this.testHelperModules[testHelperModule.name];
    }

    async close(): Promise<void> {
        this.app.flushLogs();
        jest.restoreAllMocks();
        await this.app.close();
        this.app = null;
    }

    getService<T>(service: Type<T>): Promise<T> {
        return this.moduleFixture.resolve(service);
    }

    get(url: string, callback?: CallbackHandler): request.Test {
        return request(this.httpService).get(url, callback);
    }

    post(url: string, callback?: CallbackHandler): request.Test {
        return request(this.httpService).post(url, callback);
    }

    put(url: string, callback?: CallbackHandler): request.Test {
        return request(this.httpService).put(url, callback);
    }

    patch(url: string, callback?: CallbackHandler): request.Test {
        return request(this.httpService).patch(url, callback);
    }

    delete(url: string, callback?: CallbackHandler): request.Test {
        return request(this.httpService).delete(url, callback);
    }
}
