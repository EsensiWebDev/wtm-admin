"use client";

import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Report, ReportBooking } from "@/app/(dashboard)/report/types";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  useReportBookingsPaginated,
  useReportWithBookings,
} from "@/hooks/use-report-queries";
import { format } from "date-fns";

interface DetailReportDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  report: Report | null;
  onSuccess?: () => void;
}

// Column definitions for the booking details table
const columns: ColumnDef<ReportBooking>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
  {
    id: "guest_name",
    accessorKey: "guest_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guest Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.guest_name}</div>
    ),
    enableColumnFilter: true,
    meta: {
      label: "Guest Name",
      placeholder: "Search guest name...",
      variant: "text",
    },
    enableHiding: false,
  },
  {
    id: "room_type",
    accessorKey: "room_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room Type" />
    ),
    cell: ({ row }) => row.original.room_type,
    enableColumnFilter: true,
    meta: {
      label: "Room Type",
      placeholder: "Search room type...",
      variant: "text",
    },
    enableHiding: false,
  },
  {
    id: "date_in",
    accessorKey: "date_in",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date In" />
    ),
    cell: ({ row }) => {
      const dateIn = new Date(row.original.date_in);
      return <div className="text-sm">{format(dateIn, "MMM dd, yyyy")}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "date_out",
    accessorKey: "date_out",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Out" />
    ),
    cell: ({ row }) => {
      const dateOut = new Date(row.original.date_out);
      return <div className="text-sm">{format(dateOut, "MMM dd, yyyy")}</div>;
    },
    enableSorting: true,
  },
  {
    id: "capacity",
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.capacity}</div>
    ),
    enableSorting: true,
    size: 100,
    enableHiding: false,
  },
  {
    id: "additional",
    accessorKey: "additional",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Additional" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.original.additional}>
        {row.original.additional || "-"}
      </div>
    ),
    enableColumnFilter: true,
    meta: {
      label: "Additional",
      placeholder: "Search additional...",
      variant: "text",
    },
    enableHiding: false,
  },
];

export function DetailReportDialog({
  report,
  onSuccess,
  ...props
}: DetailReportDialogProps) {
  // State for server-side pagination and sorting
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date_in", desc: false },
  ]);

  // Use server-side paginated query
  const {
    data: paginatedData,
    isLoading,
    error,
    isFetching,
  } = useReportBookingsPaginated({
    reportId: report?.id,
    pagination,
    sorting,
    enabled: props.open,
  });

  // Use basic report data for header info
  const { data: reportWithBookings } = useReportWithBookings(
    report?.id,
    props.open
  );

  // Calculate page count from server response
  const pageCount = paginatedData?.pageCount ?? 0;

  const table = useReactTable({
    data: paginatedData?.data ?? [],
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  if (!report) return null;

  const displayReport = reportWithBookings || report;

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Report Details - {displayReport.name}</DialogTitle>
          <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Company:</span>{" "}
              {displayReport.company}
            </div>
            <div>
              <span className="font-medium">Email:</span> {displayReport.email}
            </div>
            <div>
              <span className="font-medium">Hotel:</span>{" "}
              {displayReport.hotel_name}
            </div>
            <div>
              <span className="font-medium">Status:</span>{" "}
              {displayReport.status}
            </div>
            <div>
              <span className="font-medium">Confirmed Bookings:</span>{" "}
              {displayReport.confirmed_bookings}
            </div>
            <div>
              <span className="font-medium">Cancelled Bookings:</span>{" "}
              {displayReport.cancelled_bookings}
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="flex items-center gap-2">
                <LoadingSpinner className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  Loading booking details...
                </span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <p className="text-sm text-destructive mb-2">
                  Failed to load booking details
                </p>
                <p className="text-xs text-muted-foreground">
                  {error instanceof Error ? error.message : "An error occurred"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto relative">
                {isFetching && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 rounded-lg bg-background p-3 shadow-lg border">
                      <LoadingSpinner className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">
                        Updating data...
                      </span>
                    </div>
                  </div>
                )}
                <DataTable table={table} />
              </div>
              {/* <div className="flex-shrink-0 border-t pt-4">
                <DataTablePagination table={table} />
                {paginatedData && (
                  <div className="text-sm text-muted-foreground mt-2 text-center">
                    Total: {paginatedData.totalCount} booking
                    {paginatedData.totalCount !== 1 ? "s" : ""}
                  </div>
                )}
              </div> */}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
