export interface ErrorResponse extends Error {
	statusCode?: number;
	message: string;
	stack?: string;
}
