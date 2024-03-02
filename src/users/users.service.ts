import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    id: number,
  ): Promise<{ id: number; email: string; balance: number } | null> {
    const user = await this.prisma.user.findUnique({
      select: { id: true, email: true, balance: true },
      where: { id },
    });
    return user;
  }

  async getUsers(): Promise<{ id: number; email: string; balance: number }[]> {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, balance: true },
    });
  }
}
