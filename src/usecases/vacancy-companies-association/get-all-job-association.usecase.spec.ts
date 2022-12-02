import { GetAllJobAssociationUseCases } from './get-all-job-association.usecase';

class VacancyCompaniesAssociationRepositorySpy {
  vacancyCompaniesAssociation = [];

  async getAll() {
    return this.vacancyCompaniesAssociation;
  }
}

const makeSut = () => {
  const vacancyCompaniesAssociationRepositorySpy =
    new VacancyCompaniesAssociationRepositorySpy();

  const sut = new GetAllJobAssociationUseCases(
    vacancyCompaniesAssociationRepositorySpy as any,
  );

  return {
    sut,
    vacancyCompaniesAssociationRepositorySpy,
  };
};

describe('GetAllJobAssociationUseCases', () => {
  it('should call VacancyCompaniesAssociationRepository with correct values', async () => {
    const { sut } = makeSut();

    const result = await sut.execute();

    expect(result).toEqual([]);
  });

  it('should return a list of vacancy companies association', async () => {
    const { sut, vacancyCompaniesAssociationRepositorySpy } = makeSut();

    vacancyCompaniesAssociationRepositorySpy.vacancyCompaniesAssociation = [
      {
        vacancyId: 'any_vacancy_id',
        companyId: 'any_company_id',
      },
      {
        vacancyId: 'any_vacancy_id',
        companyId: 'any_company_id',
      },
    ];

    const result = await sut.execute();

    expect(result.length).toBe(2);
  });
});
