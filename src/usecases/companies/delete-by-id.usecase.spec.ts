import { DeleteCompanyByIdUseCases } from './delete-by-id.usecase';

class CompaniesRepositorySpy {
  companyId: string;
  company = null;
  async findById(id: string) {
    this.companyId = id;
    return this.company;
  }

  async delete(id: string) {
    this.companyId = id;
    return this.company;
  }
}

class VacancyCompaniesAssociationRepositorySpy {
  jobCompanyAssociation = null;
  companyId = null;

  async findByCompanyId(id: string) {
    this.companyId = id;
    return this.jobCompanyAssociation;
  }
}

class ExceptionServiceSpy {
  badRequestException({ message }) {
    throw new Error(message);
  }
}

const makeSut = () => {
  const companiesRepositorySpy = new CompaniesRepositorySpy();
  const vacancyCompaniesAssociationRepository =
    new VacancyCompaniesAssociationRepositorySpy();
  const exceptionServiceSpy = new ExceptionServiceSpy();

  const sut = new DeleteCompanyByIdUseCases(
    companiesRepositorySpy as any,
    vacancyCompaniesAssociationRepository as any,
    exceptionServiceSpy as any,
  );

  return {
    sut,
    companiesRepositorySpy,
    vacancyCompaniesAssociationRepository,
    exceptionServiceSpy,
  };
};

describe('DeleteCompanyByIdUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it(`should throw an error if exists association between company and job vacancy`, async () => {
    const { sut, vacancyCompaniesAssociationRepository } = makeSut();

    vacancyCompaniesAssociationRepository.jobCompanyAssociation = [
      {
        companyId: 'any_id',
        jobVacancyId: 'any_id',
      },
    ];

    const fakeCompany = {
      _id: 'any_id',
      name: 'any_name',
      address: 'any_address',
      status: true,
      createdAt: new Date(),
    };

    const promise = sut.execute(fakeCompany._id);

    expect(promise).rejects.toThrow(
      new Error('This company has job vacancies associated'),
    );
  });

  it(`should call delete method from companies repository with correct params`, async () => {
    const {
      sut,
      companiesRepositorySpy,
      vacancyCompaniesAssociationRepository,
    } = makeSut();

    vacancyCompaniesAssociationRepository.jobCompanyAssociation = [];
    companiesRepositorySpy.company = {
      _id: 'any_id',
      name: 'any_name',
      address: 'any_address',
      status: true,
    };

    const result = await sut.execute('any_id');

    expect(result).not.toBeNull();
    expect(companiesRepositorySpy.companyId).toBe('any_id');
  });
});
