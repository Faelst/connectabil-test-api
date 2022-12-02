import { GetCompanyByIdUseCases } from './get-by-id.usecase';

class CompaniesRepositorySpy {
  companyId: string;
  company = null;
  async findById(id: string) {
    this.companyId = id;
    return this.company;
  }
}

const makeSut = () => {
  const companyRepositorySpy = new CompaniesRepositorySpy();
  const sut = new GetCompanyByIdUseCases(companyRepositorySpy as any);

  return {
    sut,
    companyRepositorySpy,
  };
};

describe('GetCompanyByIdUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to get a company by id', async () => {
    const { sut, companyRepositorySpy } = makeSut();

    const fakeCompany = {
      _id: 'any_id',
      name: 'any_name',
      address: 'any_address',
      status: true,
      createdAt: new Date(),
    };

    companyRepositorySpy.company = fakeCompany;

    const company = await sut.execute('any_id');

    expect(company).toEqual(fakeCompany);
  });
});
