import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Add user already exist checkup
        const newUser = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                name: createUserDto.name,
            },
        });

        return newUser;
    }

    async findUser(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }
}
