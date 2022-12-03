import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

export class UpdateCompanyDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsBoolean()
  status?: boolean;
}
