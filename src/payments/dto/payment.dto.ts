import { PaymentType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  public paymentType: PaymentType;

  @IsNotEmpty()
  public amount: number;

  @IsNotEmpty()
  @IsString()
  public description: string;

  public categoryId: number;

  public userId: number;
}
