import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaymentDto } from './dto/payment.dto';
import { Payment } from '@prisma/client';
import { paymentLogger } from 'src/utils/winston.config';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(paymentDto: PaymentDto): Promise<Payment> {
    paymentLogger.info(
      `Создан платеж: ${paymentDto.paymentType}, ${paymentDto.categoryId}, ${new Date()}, ${paymentDto.amount}`,
    );

    try {
      const payment = await this.prisma.payment.create({
        data: paymentDto,
      });
      return payment;
    } catch (error) {
      throw new Error('Error while creating payment');
    }
  }

  async updatePayment(id: number, paymentDto: PaymentDto): Promise<Payment> {
    paymentLogger.info(
      `Платеж обновлен: ${paymentDto.paymentType}, ${paymentDto.categoryId}, ${new Date()}, ${paymentDto.amount}`,
    );
    try {
      const existingPayment = await this.prisma.payment.findUnique({
        where: { id },
      });

      if (!existingPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      const updatedPayment = await this.prisma.payment.update({
        where: { id },
        data: paymentDto,
      });

      return updatedPayment;
    } catch (error) {
      throw new Error(`Error while updating payment with ID ${id}`);
    }
  }

  async deletePayment(
    id: number,
    paymentDto: PaymentDto,
  ): Promise<{ message: string }> {
    paymentLogger.info(
      `Платеж удален: ${paymentDto.paymentType}, ${paymentDto.categoryId}, ${new Date()}, ${paymentDto.amount}`,
    );
    try {
      const existingPayment = await this.prisma.payment.findUnique({
        where: { id },
      });

      if (!existingPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      await this.prisma.payment.delete({
        where: { id },
      });

      return { message: `Payment with ID ${id} has been deleted` };
    } catch (error) {
      throw new Error(`Error while deleting payment with ID ${id}`);
    }
  }
}
