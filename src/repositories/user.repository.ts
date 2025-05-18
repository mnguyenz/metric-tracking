import { Repository } from 'typeorm';
import { CustomRepository } from '~core/decorators/custom-repository.decorator';
import { UserEntity } from '~entities/user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
