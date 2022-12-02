import { PostNewJobVacancyAssociationUseCases } from './post-new-job.usecase';

class JobVacancyRepositorySpy {
  jobVacancy = {};

  async findById(id: string) {
    return this.jobVacancy;
  }
}

class CompaniesRepositorySpy {
  companyId: string;
  company = null;
  async findById(id: string) {
    this.companyId = id;
    return this.company;
  }
}

class VacancyCompaniesAssociationRepositorySpy {
  companyId: string;
  jobVacancyId: string;
  existsAssociation = null;

  async findByCompanyIdAndJobVacancyId({ companyId, jobVacancyId }) {
    this.companyId = companyId;
    this.jobVacancyId = jobVacancyId;
    return this.existsAssociation;
  }

  async create({ companyId, jobVacancyId }) {
    this.companyId = companyId;
    this.jobVacancyId = jobVacancyId;
    return {
      companyId,
      jobVacancyId,
    };
  }
}

class ExceptionServiceSpy {
  badRequestException({ message }) {
    throw new Error(message);
  }
}

const makeSut = () => {
  const jobRepositorySpy = new JobVacancyRepositorySpy();
  const companyRepositorySpy = new CompaniesRepositorySpy();
  const vacancyCompaniesAssociationRepositorySpy =
    new VacancyCompaniesAssociationRepositorySpy();
  const exceptionServiceSpy = new ExceptionServiceSpy();

  const sut = new PostNewJobVacancyAssociationUseCases(
    vacancyCompaniesAssociationRepositorySpy as any,
    jobRepositorySpy as any,
    companyRepositorySpy as any,
    exceptionServiceSpy as any,
  );

  return {
    sut,
    jobRepositorySpy,
    exceptionServiceSpy,
    companyRepositorySpy,
    vacancyCompaniesAssociationRepositorySpy,
  };
};

describe('PostNewJobVacancyAssociationUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should throw if no company is found', async () => {
    const { sut } = makeSut();

    const promise = sut.execute({
      companyId: 'any_id',
      jobVacancyId: 'any_id',
    });

    expect(promise).rejects.toThrow(new Error('Company not found'));
  });

  it('should throw if no job vacancy is found', async () => {
    const { sut, jobRepositorySpy, companyRepositorySpy } = makeSut();

    companyRepositorySpy.company = {};
    jobRepositorySpy.jobVacancy = null;

    const promise = sut.execute({
      companyId: 'any_id',
      jobVacancyId: 'any_id',
    });

    expect(promise).rejects.toThrow(new Error('Job vacancy not found'));
  });

  it('should throw if job vacancy is not active', async () => {
    const { sut, jobRepositorySpy, companyRepositorySpy } = makeSut();

    companyRepositorySpy.company = {};
    jobRepositorySpy.jobVacancy = { status: false };

    const promise = sut.execute({
      companyId: 'any_id',
      jobVacancyId: 'any_id',
    });

    expect(promise).rejects.toThrow(new Error('Job vacancy is not active'));
  });

  it('should throw if job vacancy is already associated with company', async () => {
    const {
      sut,
      vacancyCompaniesAssociationRepositorySpy,
      companyRepositorySpy,
      jobRepositorySpy,
    } = makeSut();

    companyRepositorySpy.company = {};
    jobRepositorySpy.jobVacancy = { status: true };
    vacancyCompaniesAssociationRepositorySpy.existsAssociation = {};

    const promise = sut.execute({
      companyId: 'any_id',
      jobVacancyId: 'any_id',
    });

    expect(promise).rejects.toThrow(
      new Error('This job vacancy already has a company associated'),
    );
  });

  it('should call VacancyCompaniesAssociationRepository with correct values', async () => {
    const {
      sut,
      vacancyCompaniesAssociationRepositorySpy,
      companyRepositorySpy,
      jobRepositorySpy,
    } = makeSut();

    companyRepositorySpy.company = {};
    jobRepositorySpy.jobVacancy = { status: true };
    vacancyCompaniesAssociationRepositorySpy.existsAssociation = null;

    await sut.execute({
      companyId: 'valid_id',
      jobVacancyId: 'valid_id',
    });

    expect(vacancyCompaniesAssociationRepositorySpy.companyId).toBe('valid_id');
    expect(vacancyCompaniesAssociationRepositorySpy.jobVacancyId).toBe(
      'valid_id',
    );
  });
});
