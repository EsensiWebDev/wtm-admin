import { ApiResponse, SearchParams } from "@/types";
import { Hotel } from "../types";
import { buildQueryParams } from "@/lib/utils";
import { apiCall } from "@/lib/api";
import { RoomAvailability } from "./types";

export const getData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<ApiResponse<Hotel[]>> => {
  const queryString = buildQueryParams(searchParams);
  const url = `/hotels${queryString ? `?${queryString}` : ""}`;
  const apiResponse = await apiCall<Hotel[]>(url);

  return apiResponse;
};

export const getRoomAvaliableByHotelId = async ({
  hotel_id,
  period,
}: {
  hotel_id: string;
  period: string;
}): Promise<ApiResponse<RoomAvailability[]>> => {
  console.log("CALL API ROOM AVAILABLE");
  const url = `/hotels/room-available?hotel_id=${hotel_id}&period=${period}`;
  const apiResponse = await apiCall<RoomAvailability[]>(url);

  console.log({ apiResponse });

  return apiResponse;
};
