import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(1)
  content!: string;

  @IsInt()
  userId!: number;
}