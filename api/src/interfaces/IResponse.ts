import { StatusKey } from '../utils/StatusCodes';

export interface IResponse<T> {
  status: StatusKey;
  data: T | { message: string };
}