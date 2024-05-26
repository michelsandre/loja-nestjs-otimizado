import { IsEmail, IsNotEmpty } from 'class-validator';

export class AutenticaDTO {
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  senha: string;
}
