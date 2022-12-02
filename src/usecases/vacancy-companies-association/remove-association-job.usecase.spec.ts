import { RemoveAssociationJobUseCases } from './remove-association-job.usecase';

class VacancyCompaniesAssociationRepositorySpy {
  companyId: string;
  vacancyCompaniesAssociation = null;
  vacancyCompaniesAssociationId: string;

  async findById(id: string) {
    this.vacancyCompaniesAssociationId = id;
    return this.vacancyCompaniesAssociation;
  }

  async delete(id: string) {
    this.vacancyCompaniesAssociationId = id;
  }
}

class ExceptionServiceSpy {
  badRequestException({ message }) {
    throw new Error(message);
  }
}

const makeSut = () => {
  const vacancyCompaniesAssociationRepositorySpy =
    new VacancyCompaniesAssociationRepositorySpy();
  const exceptionServiceSpy = new ExceptionServiceSpy();

  const sut = new RemoveAssociationJobUseCases(
    vacancyCompaniesAssociationRepositorySpy as any,
    exceptionServiceSpy as any,
  );

  return {
    sut,
    vacancyCompaniesAssociationRepositorySpy,
    exceptionServiceSpy,
  };
};

describe('RemoveAssociationJobUseCases', () => {
  it('should throw if dont find vacancy companies association', async () => {
    const { sut } = makeSut();

    const promise = sut.execute('any_id');
    await expect(promise).rejects.toThrow(
      new Error('Vacancy companies association not found'),
    );
  });

  it('should call VacancyCompaniesAssociationRepository with correct values', async () => {
    const { sut, vacancyCompaniesAssociationRepositorySpy } = makeSut();

    vacancyCompaniesAssociationRepositorySpy.vacancyCompaniesAssociation = {};

    await sut.execute('any_id');

    expect(
      vacancyCompaniesAssociationRepositorySpy.vacancyCompaniesAssociationId,
    ).toBe('any_id');
  });
});
