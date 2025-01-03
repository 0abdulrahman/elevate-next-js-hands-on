declare type DatabaseFields = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type SuccessfulResponse<T> = {
  status: "success";
  statusCode: number;
  data: T;
};

declare type ValidationError = {
  field: string;
  errorMessage: string;
};

declare type ErrorResponse = {
  status: "error" | "fail";
  statusCode: number;
  message: string | ValidationError[];
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type Metadata = {
  total: number;
  count: number;
  pages: number | null;
  limit: number;
  page: number;
};

declare type PaginatedResponse<T> = {
  [key: string]: T;
  pagination: Metadata;
};
