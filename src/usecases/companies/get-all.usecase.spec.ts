import { GetAllCompaniesUseCases } from './get-all.usecase';

class CompaniesRepositorySpy {
  companies = null;
  async findAll() {
    return this.companies;
  }
}

const makeSut = () => {
  const companyRepositorySpy = new CompaniesRepositorySpy();
  const sut = new GetAllCompaniesUseCases(companyRepositorySpy as any);

  return {
    sut,
    companyRepositorySpy,
  };
};

describe('GetAllCompaniesUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to get all companies', async () => {
    const { sut, companyRepositorySpy } = makeSut();

    const fakeCompany = {
      _id: 'any_id',
      name: 'any_name',
      address: 'any_address',
      status: true,
      createdAt: new Date(),
    };

    companyRepositorySpy.companies = [fakeCompany];

    const companies = await sut.execute();

    expect(companies).toEqual([fakeCompany]);
  });
});
