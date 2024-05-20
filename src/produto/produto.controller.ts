import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Post()
  async criar(@Body() dadosDoProduto: CriaProdutoDTO) {
    const novoProduto = await this.produtoService.criaProduto(dadosDoProduto);
    return novoProduto;
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizaProdutoDTO,
  ) {
    await this.produtoService.atualizaProduto(id, novosDados);
    return {
      message: 'Produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deletaProduto(@Param('id') id: string) {
    await this.produtoService.deletaProduto(id);
    return {
      message: 'Produto removido com sucesso!',
    };
  }
}
