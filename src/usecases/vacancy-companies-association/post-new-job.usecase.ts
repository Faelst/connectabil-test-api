import {
  Companies,
  JobVacancy,
} from '@/infrastructure/config/database/schemas';
import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';
import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';
import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';

type Props = {
  companyId: string;
  jobVacancyId: string;
};

export type PostNewJobVacancyAssociationUseCasesResponse = {
  company: Companies;
  jobVacancy: JobVacancy;
};

export class PostNewJobVacancyAssociationUseCases {
  constructor(
    private readonly vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
    private readonly JobVacancyRepository: JobVacancyRepository,
    private readonly companyRepository: CompaniesRepository,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async execute({
    companyId,
    jobVacancyId,
  }: Props): Promise<PostNewJobVacancyAssociationUseCasesResponse> {
    const activeCompany = await this.companyRepository.findById(companyId);

    if (!activeCompany) {
      this.exceptionService.badRequestException({
        message: 'Company not found',
      });
    }

    const activeJobVacancy = await this.JobVacancyRepository.findById(
      jobVacancyId,
    );

    if (!activeJobVacancy) {
      this.exceptionService.badRequestException({
        message: 'Job vacancy not found',
      });
    }

    if (!activeJobVacancy.status) {
      this.exceptionService.badRequestException({
        message: 'Job vacancy is not active',
      });
    }

    const existsAssociation =
      await this.vacancyCompaniesAssociationRepository.findByCompanyIdAndJobVacancyId(
        {
          companyId,
          jobVacancyId,
        },
      );

    if (existsAssociation) {
      this.exceptionService.badRequestException({
        message: 'This job vacancy already has a company associated',
      });
    }

    await this.vacancyCompaniesAssociationRepository.create({
      companyId,
      jobVacancyId,
    });

    return {
      company: activeCompany,
      jobVacancy: activeJobVacancy,
    };
  }
}
