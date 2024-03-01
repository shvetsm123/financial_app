import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
