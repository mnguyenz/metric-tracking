import { Repository, ObjectLiteral } from 'typeorm';
import { dataSourceContainer, DEFAULT_DATA_SOURCE_NAME } from '~core/modules/typeorm-module.module';

export abstract class BaseRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
    static make<T extends BaseRepository<any>>(this: new (...args: any[]) => T): T {
        const dataSource = dataSourceContainer.get(DEFAULT_DATA_SOURCE_NAME);
        if (!dataSource) {
            throw new Error('DataSource not initialized');
        }

        const entity = Reflect.getMetadata('TYPEORM_EX_CUSTOM_REPOSITORY', this);
        if (!entity) {
            throw new Error('Entity metadata not found on repository');
        }

        const baseRepository = dataSource.getRepository(entity);
        return new this(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
    }
}
