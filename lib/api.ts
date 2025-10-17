import { bffFetch } from "@/lib/bff-client";
import { ApiResponse } from "@/types";

/**
 * Server-side helper to call the BFF client and parse the standardized API response.
 */
export async function apiCall<TData>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<TData>> {
  const response = await bffFetch(endpoint, options);

  if (!response.ok) {
    const error = await response.json();

    return error;
  }

  const apiResponse: ApiResponse<TData> = await response.json();
  return apiResponse;
}
