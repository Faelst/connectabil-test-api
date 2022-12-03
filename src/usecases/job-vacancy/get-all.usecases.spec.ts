import { GetAllJobVacancyUseCases } from './get-all.usecases';

class JobVacancyRepositorySpy {
  jobVacancies = null;
  async findAll() {
    return this.jobVacancies;
  }
}

const makeSut = () => {
  const jobVacancyRepositorySpy = new JobVacancyRepositorySpy();
  const sut = new GetAllJobVacancyUseCases(jobVacancyRepositorySpy as any);

  return {
    sut,
    jobVacancyRepositorySpy,
  };
};

describe('GetAllJobVacancyUseCases', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should be able to get all job vacancies', async () => {
    const { sut, jobVacancyRepositorySpy } = makeSut();

    const fakeJobVacancy = {
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      status: true,
      createdAt: new Date(),
    };

    jobVacancyRepositorySpy.jobVacancies = [fakeJobVacancy];

    const jobVacancies = await sut.execute();

    expect(jobVacancies).toEqual([fakeJobVacancy]);
  });
});
