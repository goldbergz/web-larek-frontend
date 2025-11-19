export enum EnumApiMethods {
	POST = 'POST',
	DELETE = 'DELETE',
	GET = 'GET',
}

export interface IApiClient {
  get(uri: string): Promise<object>;
  post(uri: string, data: object, method?: EnumApiMethods): Promise<object>;
}

export type ErrorState = {
	error: string | null;
};