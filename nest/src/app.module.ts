import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma.module';

@Module({
    imports: [UsersModule, CommentsModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
