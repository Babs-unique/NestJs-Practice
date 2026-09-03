import { Body, Controller, Get, Param, Post, Put, Query , Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { createUserDto } from './dtos/user.dtos';
import { updateUserDto } from './dtos/updateUser.dto';
import { type User, UsersService } from './users.service';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}
    @Get()
    getUsers() {
         return [
            { id: 1 , name: 'John Doe'},
            { id: 2 , name: 'John Smith'}
        ]
    }
    @Get(':id')
    getUsersById(@Param('id', ParseIntPipe) id:number) {
        return this.userService.findOneUser(id);
    }
    @Get()
    getUsersByQuery(@Query('name') name: string): User[] {
        return this.userService.findAllUsers(name);
    }
    @Post()
    createUser(@Body() createUserDto: createUserDto){
        this.userService.createUser(createUserDto);
    }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: updateUserDto){
       this.userService.updateUser(Number(id), updateUserDto);
    }
    @Delete(':id')
    @UseGuards(RoleGuard)
    deleteUser(@Param('id', ParseIntPipe) id: number){
        this.userService.deleteUser(id);
    }
}
