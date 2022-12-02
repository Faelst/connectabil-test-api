import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobVacancyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsEnum(['REMOTE', 'PRESENCIAL', 'MIXED'])
  @IsNotEmpty()
  type: 'REMOTE' | 'PRESENCIAL' | 'MIXED';

  @ApiProperty()
  @IsEnum([true, false])
  @IsNotEmpty()
  status: boolean;
}

export class UpdateJobVacancyDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsEnum(['REMOTE', 'PRESENCIAL', 'MIXED'])
  type?: 'REMOTE' | 'PRESENCIAL' | 'MIXED';

  @ApiProperty()
  @IsEnum([true, false])
  status?: boolean;
}
