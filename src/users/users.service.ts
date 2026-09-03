import { Injectable, NotFoundException } from '@nestjs/common';
import { loggerService } from './user.logger';
import { createUserDto } from './dtos/user.dtos';
import { updateUserDto } from './dtos/updateUser.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly loggerService: loggerService) {}

  private users: User[] = [
    { id: 1,  name: 'Babatunde', email: 'babatunde@gmail.com' },
    { id: 2,  name: 'John Doe', email: 'johndoe@gmail.com' },
  ];

  findAllUsers(name: string = ''): User[] {
    this.loggerService.log('Finding all users');
    const user =  this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
    if(!user){
      this.loggerService.log('No user found');  
      throw new NotFoundException('No user found');
    }
    return user;
  }
  findOneUser(id: number){
    this.loggerService.log('Finding user by id');
    const user = this.users.find(user => user.id === id) ?? null;
    if(!user){
      this.loggerService.log('User not found');  
      throw new NotFoundException('User not found');
    }
    return user;
  }
  createUser(dto: createUserDto){
    this.loggerService.log('Creating user'); 
    const newUser: User = { id: this.users.length + 1, ...dto };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, dto: updateUserDto){
    this.loggerService.log('Updating user');
    const index = this.users.findIndex(user => user.id === id);
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  deleteUser(id: number){
    this.loggerService.log('Deleting user');
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1) return null
    this.users.splice(index, 1);
  }
}
