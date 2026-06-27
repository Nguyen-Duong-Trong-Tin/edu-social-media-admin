export interface IRootState {}

export interface ISpecification {
  page: number;
  size: number;
}

export interface IResponseSpecification<T> {
  page: number;
  size: number;
  totalPages: number;
  items: T;
}
