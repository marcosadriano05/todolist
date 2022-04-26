export interface Repository<T> {
  save(data: T): Promise<T>;
}
