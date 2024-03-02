import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number; email: string; balance: number } | null> {
    return this.usersService.getUser(id);
  }

  @Get()
  getUsers(): Promise<{ id: number; email: string; balance: number }[]> {
    return this.usersService.getUsers();
  }
}
