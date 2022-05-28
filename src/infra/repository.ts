/**
 * Repository interface where generics T and R represents the input data and the response data.
 */
export interface Repository<T, R> {
  findById(id: string | number): Promise<R>;
  findAll(): Promise<R[]>;
  save(data: T): Promise<R>;
  edit(data: T): Promise<R>;
}
