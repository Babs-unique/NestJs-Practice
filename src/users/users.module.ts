import { Module } from '@nestjs/common';
import { loggerService } from './user.logger';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, loggerService],
})
export class UsersModule {}
