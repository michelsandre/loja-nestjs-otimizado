import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayLoad {
  sub: string;
  userName: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado =
      usuario === null
        ? false
        : await bcrypt.compare(senhaInserida, usuario.senha);

    if (!usuarioFoiAutenticado)
      throw new UnauthorizedException('O email e/ou senha estão incorretos');

    const payload: UsuarioPayLoad = {
      sub: usuario!.id,
      userName: usuario!.nome,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
