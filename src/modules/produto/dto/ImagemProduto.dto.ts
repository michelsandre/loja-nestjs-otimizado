import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class ImagemProdutoDTO {
  id: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  produto: ProdutoEntity;
}
