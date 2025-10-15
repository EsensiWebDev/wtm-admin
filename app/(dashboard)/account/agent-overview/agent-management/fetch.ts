import { apiCall, buildQueryParams } from "@/lib/utils";
import { ApiResponse, SearchParams } from "@/types";
import { Agent } from "./types";

export const getAgentData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<ApiResponse<Agent[]>> => {
  const queryString = buildQueryParams(searchParams);
  const url = `/users?role=agent${queryString ? `&${queryString}` : ""}`;
  const apiResponse = await apiCall<Agent[]>(url);

  return apiResponse;
};
