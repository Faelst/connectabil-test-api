import { GetJobVacancyByIdUseCases } from './get-by-id.usecase';

class JobVacancyRepositorySpy {
  jobId: string;
  job = null;
  async findById(id: string) {
    this.jobId = id;
    return this.job;
  }
}

const makeSut = () => {
  const jobVacancyRepositorySpy = new JobVacancyRepositorySpy();
  const sut = new GetJobVacancyByIdUseCases(jobVacancyRepositorySpy as any);

  return {
    sut,
    jobVacancyRepositorySpy,
  };
};

describe('GetJobVacancyByIdUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to get a job vacancy by id', async () => {
    const { sut, jobVacancyRepositorySpy } = makeSut();

    const fakeJobVacancy = {
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      status: true,
      createdAt: new Date(),
    };

    jobVacancyRepositorySpy.job = fakeJobVacancy;

    const jobVacancy = await sut.execute('any_id');

    expect(jobVacancy).toEqual(fakeJobVacancy);
  });
});
