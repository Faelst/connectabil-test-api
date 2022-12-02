import { IsNotEmpty, IsString } from 'class-validator';

export class PostNewJobVacancyAssociationDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsNotEmpty()
  @IsString()
  jobVacancyId: string;
}
