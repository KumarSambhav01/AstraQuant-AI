import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class AddWatchlistDto {
  @ApiProperty({
    example: 'AAPL',
    description: 'Stock ticker symbol',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @Matches(/^[A-Za-z0-9.-]+$/, {
    message: 'Symbol contains invalid characters',
  })
  symbol!: string;
}