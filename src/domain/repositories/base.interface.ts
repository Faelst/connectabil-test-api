export interface BaseInterface<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  delete(
    id: string,
    data: { deleted: boolean; updatedAt: Date },
    options: any,
  ): Promise<T>;
}
