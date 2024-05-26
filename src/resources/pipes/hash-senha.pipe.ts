import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashSenhaPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(senha: string) {
    // const salt = this.configService.get<string>('SALT_SENHA');

    const senhaHash = await bcrypt.hash(senha, 10);

    return senhaHash;
  }
}
