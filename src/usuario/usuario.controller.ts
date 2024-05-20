import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService,
  ) {}

  @Post()
  async criar(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const novoUsuario = await this.usuarioService.criaUsuario(dadosDoUsuario);

    return {
      usuario: new ListaUsuarioDTO(novoUsuario.id, novoUsuario.nome),
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listarTodos() {
    const usuarios = await this.usuarioService.listaUsuarios();
    return usuarios;
  }
  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuario = await this.usuarioService.atualizaUsuario(id, novosDados);

    return {
      message: 'Usuário atualizado com sucesso',
      usuario,
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    await this.usuarioService.deletaUsuario(id);
    return {
      message: 'Usuario removido com sucesso',
    };
  }
}
