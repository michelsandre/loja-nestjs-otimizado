import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async cadastraPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    const pedido = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );

    return pedido;
  }

  @Get()
  async listaPedidos(@Query('usuarioId') usuarioId: string) {
    return await this.pedidoService.listaPedidos(usuarioId);
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDto,
  ) {
    return await this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDeAtualizacao,
    );
  }
}
