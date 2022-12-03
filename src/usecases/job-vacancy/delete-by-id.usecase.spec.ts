import { DeleteJobVacancyByIdUseCases } from './delete-by-id.usecase';

class JobVacancyRepositorySpy {
  jobVacancyId: string;
  jobVacancy = null;
  async findById(id: string) {
    this.jobVacancyId = id;
    return this.jobVacancy;
  }

  async delete(id: string) {
    this.jobVacancyId = id;
    return this.jobVacancy;
  }
}

class ExceptionServiceSpy {
  badRequestException({ message }) {
    throw new Error(message);
  }
}

const makeSut = () => {
  const jobVacancyRepositorySpy = new JobVacancyRepositorySpy();
  const exceptionServiceSpy = new ExceptionServiceSpy();

  const sut = new DeleteJobVacancyByIdUseCases(
    jobVacancyRepositorySpy as any,
    exceptionServiceSpy as any,
  );

  return {
    sut,
    jobVacancyRepositorySpy,
  };
};

describe('DeleteJobVacancyByIdUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it(`should throw an error if job vacancy not exists`, async () => {
    const { sut, jobVacancyRepositorySpy } = makeSut();

    jobVacancyRepositorySpy.jobVacancy = null;

    const promise = sut.execute('any_id');

    await expect(promise).rejects.toThrow(new Error('Job vacancy not found'));
  });

  it('should be able to delete a job vacancy', async () => {
    const { sut, jobVacancyRepositorySpy } = makeSut();

    const fakeJobVacancy = {
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      salary: 1000,
      company: 'any_company',
    };

    jobVacancyRepositorySpy.jobVacancy = fakeJobVacancy;

    const jobVacancy = await sut.execute('any_id');

    expect(jobVacancy).toEqual(fakeJobVacancy);
  });
});
