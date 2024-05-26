import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'url', nullable: false })
  url: string;
  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produto: ProdutoEntity;
}
