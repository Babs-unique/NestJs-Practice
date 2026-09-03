import { Injectable } from '@nestjs/common';

@Injectable()
export class loggerService {
  log(message: string) {
    console.log('[LOG]', message);
  }
}