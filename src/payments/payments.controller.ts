import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() paymentDto: PaymentDto) {
    console.log('paymentDto123: ', paymentDto);
    return this.paymentsService.createPayment(paymentDto);
  }
}
