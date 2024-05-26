import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async buscaPorEmail(email: string) {
    const usuario = await this.usuarioRepository.findOneBy({ email });
    return usuario;
  }

  async listaUsuarios() {
    const usuarios = await this.usuarioRepository.find();
    const usuariosLista = usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const emailExiste = await this.usuarioRepository.findOne({
      where: { email: dadosDoUsuario.email },
    });

    if (emailExiste)
      throw new HttpException(
        'Já existe um usuario com este email',
        HttpStatus.BAD_REQUEST,
      );

    const usuarioEntity = new UsuarioEntity();
    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);
    const novoUsuario = await this.usuarioRepository.save(usuarioEntity);
    return novoUsuario;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) throw new NotFoundException('Usuário não encontrado');

    Object.assign(usuario, novosDados as UsuarioEntity);

    return await this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
