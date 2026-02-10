// src/modules/users/users.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
