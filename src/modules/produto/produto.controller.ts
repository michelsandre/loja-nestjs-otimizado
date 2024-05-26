import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

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
    return await this.produtoService.listaProdutos();
  }
  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaPorId(@Param('id') id: string) {
    return await this.produtoService.listaProdutoUnico(id);
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
