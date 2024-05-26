import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(private usuarioService: UsuarioService) {}
  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado =
      usuario === null
        ? false
        : await bcrypt.compare(senhaInserida, usuario.senha);

    if (!usuarioFoiAutenticado)
      throw new UnauthorizedException('O email e/ou senha estão incorretos');

    console.log('Usuario autenticado');
  }
}
