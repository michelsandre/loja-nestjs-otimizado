import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async listaProdutos() {
    return await this.produtoRepository.find();
  }
  async criaProduto(produto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    Object.assign(produtoEntity, produto);

    const novoProduto = await this.produtoRepository.save(produtoEntity);
    return novoProduto;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (produto === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(produto, novosDados);

    await this.produtoRepository.save(produto);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
