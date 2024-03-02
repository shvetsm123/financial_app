import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    id: number,
  ): Promise<{ id: number; email: string; balance: number } | null> {
    try {
      const user = await this.prisma.user.findUnique({
        select: { id: true, email: true, balance: true },
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error('Error while fetching user');
    }
  }

  async getUsers(): Promise<{ id: number; email: string; balance: number }[]> {
    try {
      return await this.prisma.user.findMany({
        select: { id: true, email: true, balance: true },
      });
    } catch (error) {
      throw new Error('Error while fetching users');
    }
  }

  async getCurrentBalance(userId: number): Promise<number> {
    try {
      const payments = await this.prisma.payment.findMany({
        where: {
          userId,
        },
      });

      const totalAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0,
      );

      return totalAmount;
    } catch (error) {
      throw new Error('Error while fetching current balance');
    }
  }
}
