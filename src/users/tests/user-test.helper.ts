import { faker } from '@faker-js/faker/.';
import { UserEntity } from '~entities/user.entity';
import { UserRepository } from '~repositories/user.repository';

export class UserTestHelper {
    constructor() {}

    async createUser(email?: string): Promise<UserEntity> {
        return UserRepository.make().save({ email: email || faker.internet.email() });
    }
}
