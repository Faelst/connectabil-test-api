import { UpdateJobVacancyUseCase } from './update.usecase';

class JobVacancyRepositorySpy {
  job = null;
  async findById() {
    return this.job;
  }
  async update() {
    return this.job;
  }
}

const makeSut = () => {
  const jobVacancyRepositorySpy = new JobVacancyRepositorySpy();
  const sut = new UpdateJobVacancyUseCase(jobVacancyRepositorySpy as any);

  return {
    sut,
    jobVacancyRepositorySpy,
  };
};

describe('UpdateJobVacancyUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it(`should throw an error if job vacancy not exists`, async () => {
    const { sut, jobVacancyRepositorySpy } = makeSut();

    jobVacancyRepositorySpy.job = null;

    const promise = sut.execute('any_id', {
      title: 'any_title',
      description: 'any_description',
      status: true,
    });

    await expect(promise).rejects.toThrow(new Error('Job vacancy not found'));
  });

  it('should be able to update a job vacancy', async () => {
    const { sut, jobVacancyRepositorySpy } = makeSut();

    const fakeJobVacancy = {
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      status: true,
      createdAt: new Date(),
    };

    jobVacancyRepositorySpy.job = fakeJobVacancy;

    const jobVacancy = await sut.execute('any_id', {
      title: 'any_title',
      description: 'any_description',
      status: true,
    });

    expect(jobVacancy).toEqual(fakeJobVacancy);
  });
});
