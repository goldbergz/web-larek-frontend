export enum ApiPostMethods {
	POST = 'POST',
	DELETE = 'DELETE',
	PUT = 'PUT',
}

export interface IApi {
  baseUrl: string;
  options: RequestInit;

  get<T>(uri: string): Promise<T>;
  post<T>(
    uri: string,
    data: unknown,
    method?: ApiPostMethods
  ): Promise<T>;
  handleResponse<T>(response: Response): Promise<T>
}

export type ErrorState = {
	error: string | null;
};