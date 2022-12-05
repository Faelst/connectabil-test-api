import { CreateCompanyUseCases } from './create.usecase';

class CompaniesRepositorySpy {
  company = null;
  create(company) {
    this.company = company;
    return this.company;
  }
}

const makeSut = () => {
  const companiesRepositorySpy = new CompaniesRepositorySpy();
  const sut = new CreateCompanyUseCases(companiesRepositorySpy as any);

  return {
    sut,
    companiesRepositorySpy,
  };
};

describe('CreateCompanyUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to create a company', async () => {
    const { sut } = makeSut();

    const fakeCompany = {
      _id: 'any_id',
      name: 'any_name',
      address: 'any_address',
      zip: 'any_zip',
      state: 'any_state',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      status: true,
      createdAt: new Date(),
    };

    const company = await sut.execute(fakeCompany);

    expect(company).toEqual({
      name: 'any_name',
      address: 'any_address',
      zip: 'any_zip',
      state: 'any_state',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      status: true,
    });
  });
});
