export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
	baseUrl: string;

	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: unknown, method?: ApiPostMethods): Promise<T>;
}

export type ErrorState = {
	error: string | null;
};
