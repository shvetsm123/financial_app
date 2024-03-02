import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user' })
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number; email: string; balance: number } | null> {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: 'Get balance' })
  @UseGuards(JwtAuthGuard)
  @Get(':id/balance')
  async getCurrentBalance(@Param('id') userId: string): Promise<number> {
    return this.usersService.getCurrentBalance(+userId);
  }

  @ApiOperation({ summary: 'Get users' })
  @Get()
  async getUsers(): Promise<{ id: number; email: string; balance: number }[]> {
    return this.usersService.getUsers();
  }
}
