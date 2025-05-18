import { Module } from '@nestjs/common';
import { TypeOrmHelperModule } from '~core/modules/typeorm-module.module';
import { UserRepository } from '~repositories/user.repository';

@Module({
    imports: [TypeOrmHelperModule.forCustomRepository([UserRepository])],
    controllers: [],
    providers: [],
    exports: []
})
export class UserModule {}
