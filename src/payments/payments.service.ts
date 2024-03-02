import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(paymentDto: PaymentDto) {
    const payment = await this.prisma.payment.create({
      data: paymentDto,
    });
    return payment;
  }
}
