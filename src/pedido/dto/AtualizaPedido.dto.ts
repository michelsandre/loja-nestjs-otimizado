import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/status-pedido.enum';

export class AtualizaPedidoDto {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
