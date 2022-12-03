import { CreateJobVacancyUseCases } from './create.usecase';

class JobVacancyRepositorySpy {
  job = null;
  async create(job) {
    this.job = job;
    return this.job;
  }
}

const makeSut = () => {
  const jobVacancyRepositorySpy = new JobVacancyRepositorySpy();
  const sut = new CreateJobVacancyUseCases(jobVacancyRepositorySpy as any);

  return {
    sut,
    jobVacancyRepositorySpy,
  };
};

describe('CreateJobVacancyUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to create a job vacancy', async () => {
    const { sut } = makeSut();

    const fakeJobVacancy = {
      title: 'any_title',
      description: 'any_description',
      status: true,
      type: 'REMOTE',
      createdAt: new Date(),
    };

    const jobVacancy = await sut.execute(fakeJobVacancy as any);

    expect(jobVacancy).toEqual({
      title: 'any_title',
      description: 'any_description',
      status: true,
      type: 'REMOTE',
    });
  });
});
