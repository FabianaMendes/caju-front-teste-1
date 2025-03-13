export type RequestStatus = {
  isLoading: boolean;
  error: boolean;
  success: boolean;
}

export const initialRequestStatus: RequestStatus = {
  isLoading: false,
  error: false,
  success: false
}