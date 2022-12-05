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
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

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
