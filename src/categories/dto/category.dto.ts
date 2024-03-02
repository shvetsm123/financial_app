import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 'Category - Salary', description: 'required' })
  @IsNotEmpty()
  public name: string;
}
