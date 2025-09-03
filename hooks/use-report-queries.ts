"use client";

import {
  getReportBookingsWithPagination,
  getReportDetails,
  getReportWithBookings,
} from "@/app/(dashboard)/report/fetch";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState, SortingState } from "@tanstack/react-table";

/**
 * Query key factory for report-related queries
 */
export const reportQueries = {
  all: ["reports"] as const,
  details: () => [...reportQueries.all, "detail"] as const,
  detail: (id: string) => [...reportQueries.details(), id] as const,
  bookings: () => [...reportQueries.all, "bookings"] as const,
  booking: (id: string) => [...reportQueries.bookings(), id] as const,
  withBookings: (id: string) =>
    [...reportQueries.all, "with-bookings", id] as const,
  bookingsPaginated: (
    id: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string
  ) =>
    [
      ...reportQueries.bookings(),
      id,
      "paginated",
      page,
      pageSize,
      sortBy,
      sortOrder,
    ] as const,
};

/**
 * Hook to fetch a report with its booking details
 */
export function useReportWithBookings(
  reportId: string | undefined,
  enabled = true
) {
  return useQuery({
    queryKey: reportQueries.withBookings(reportId || ""),
    queryFn: async () => {
      if (!reportId) throw new Error("Report ID is required");
      return getReportWithBookings({ id: reportId });
    },
    enabled: enabled && !!reportId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch report booking details only
 */
export function useReportBookings(
  reportId: string | undefined,
  enabled = true
) {
  return useQuery({
    queryKey: reportQueries.booking(reportId || ""),
    queryFn: async () => {
      if (!reportId) throw new Error("Report ID is required");
      return getReportDetails({ id: reportId });
    },
    enabled: enabled && !!reportId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch paginated and sorted report booking details
 */
export function useReportBookingsPaginated({
  reportId,
  pagination,
  sorting,
  enabled = true,
}: {
  reportId: string | undefined;
  pagination: PaginationState;
  sorting: SortingState;
  enabled?: boolean;
}) {
  const sortBy = sorting[0]?.id || "date_in";
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";
  const page = pagination.pageIndex + 1; // Convert 0-based to 1-based
  const pageSize = pagination.pageSize;

  return useQuery({
    queryKey: reportQueries.bookingsPaginated(
      reportId || "",
      page,
      pageSize,
      sortBy,
      sortOrder
    ),
    queryFn: async () => {
      if (!reportId) throw new Error("Report ID is required");
      return getReportBookingsWithPagination({
        id: reportId,
        page,
        pageSize,
        sortBy,
        sortOrder,
      });
    },
    enabled: enabled && !!reportId,
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for paginated data)
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Keep previous data while fetching new page
    placeholderData: (previousData) => previousData,
  });
}
