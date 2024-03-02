import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDto {
  @ApiProperty({ example: 'income | expense', description: 'required' })
  @IsNotEmpty()
  public paymentType: PaymentType;

  @ApiProperty({ example: '100', description: 'required' })
  @IsNotEmpty()
  public amount: number;

  @ApiProperty({ example: 'description', description: 'required' })
  @IsNotEmpty()
  @IsString()
  public description: string;

  @ApiProperty({ example: '1', description: 'required' })
  @IsNumber()
  public categoryId: number;

  @ApiProperty({ example: '1', description: 'required' })
  @IsNumber()
  public userId: number;
}
