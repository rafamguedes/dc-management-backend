import { StatusKey } from '../utils/StatusCode';

export interface IResponse<T> {
  status: StatusKey;
  data: T | { message: string };
}