import { Controller, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Payment } from '@prisma/client';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Create payment' })
  @Post()
  async createPayment(@Body() paymentDto: PaymentDto): Promise<Payment> {
    try {
      return await this.paymentsService.createPayment(paymentDto);
    } catch (error) {
      throw new Error('Error while creating payment');
    }
  }

  @ApiOperation({ summary: 'Change payment' })
  @Patch(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() paymentDto: PaymentDto,
  ): Promise<any> {
    try {
      return await this.paymentsService.updatePayment(+id, paymentDto);
    } catch (error) {
      throw new Error(`Error while updating payment with ID ${id}`);
    }
  }

  @ApiOperation({ summary: 'Delete payment' })
  @Delete(':id')
  async deletePayment(
    @Param('id') id: string,
    paymentDto: PaymentDto,
  ): Promise<any> {
    try {
      return await this.paymentsService.deletePayment(+id, paymentDto);
    } catch (error) {
      throw new Error(`Error while deleting payment with ID ${id}`);
    }
  }
}
