export interface Repository<T> {
  findById(id: string | number): Promise<T>;
  save(data: T): Promise<T>;
}
