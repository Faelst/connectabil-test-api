import { UpdateCompanyUseCase } from './update.usecase';

class CompaniesRepositorySpy {
  company = null;
  async findById() {
    return this.company;
  }
  async update() {
    return this.company;
  }
}

class ExceptionsServiceSpy {
  badRequestException({ message }) {
    throw new Error(message);
  }
}

const makeSut = () => {
  const companiesRepositorySpy = new CompaniesRepositorySpy();
  const exceptionsServiceSpy = new ExceptionsServiceSpy();

  const sut = new UpdateCompanyUseCase(
    companiesRepositorySpy as any,
    exceptionsServiceSpy as any,
  );

  return {
    sut,
    companiesRepositorySpy,
  };
};

describe('UpdateCompanyUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to update a company', async () => {
    const { sut, companiesRepositorySpy } = makeSut();

    const fakeCompany = {
      _id: 'any_id',
      name: 'any_name',
      address: 'any_address',
    };

    companiesRepositorySpy.company = fakeCompany;

    const company = await sut.execute('any_id', fakeCompany);

    expect(company).toEqual(fakeCompany);
  });
});
