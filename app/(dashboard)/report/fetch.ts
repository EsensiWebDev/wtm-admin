import { SearchParams } from "nuqs";
import {
  Report,
  ReportBooking,
  ReportBookingsPaginatedResponse,
  ReportTableResponse,
} from "./types";

export const getData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<ReportTableResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For performance, we'll return reports without bookings initially
  // Bookings will be fetched separately when needed (e.g., in detail dialog)
  const data = [
    {
      id: "1",
      name: "kelvin",
      company: "esensi digital",
      email: "kelvin@wtmdigital.com",
      hotel_name: "Grand Hotel Jakarta",
      status: "approved",
      confirmed_bookings: 10,
      cancelled_bookings: 5,
      bookings: [], // Empty array initially
    },
    {
      id: "2",
      name: "budi",
      company: "esensi digital",
      email: "budi@wtmdigital.com",
      hotel_name: "Hotel Indonesia",
      status: "rejected",
      confirmed_bookings: 5,
      cancelled_bookings: 10,
      bookings: [], // Empty array initially
    },
  ] as Report[];

  return {
    success: true,
    data,
    pageCount: 2,
  };
};

// New function to get a report with its bookings
export const getReportWithBookings = async ({
  id,
}: {
  id: string;
}): Promise<Report | null> => {
  // First get the base report data
  const { data: reports } = await getData({ searchParams: {} });
  const report = reports.find((r) => r.id === id);

  if (!report) return null;

  // Then fetch the bookings for this specific report
  const bookings = await getReportDetails({ id });

  return {
    ...report,
    bookings,
  };
};

export const getReportDetails = async ({
  id,
}: {
  id: string;
}): Promise<ReportBooking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return different mock data based on report ID
  if (id === "1") {
    return [
      {
        guest_name: "John Doe",
        room_type: "Deluxe Room",
        date_in: "2024-01-15T00:00:00.000Z",
        date_out: "2024-01-18T00:00:00.000Z",
        capacity: "2 Adults, 1 Child",
        additional: "Extra bed requested",
      },
      {
        guest_name: "Jane Smith",
        room_type: "Suite",
        date_in: "2024-01-20T00:00:00.000Z",
        date_out: "2024-01-22T00:00:00.000Z",
        capacity: "1 Adult",
        additional: "Late check-in",
      },
      {
        guest_name: "Michael Johnson",
        room_type: "Standard Room",
        date_in: "2024-01-25T00:00:00.000Z",
        date_out: "2024-01-27T00:00:00.000Z",
        capacity: "2 Adults",
        additional: "Airport pickup",
      },
    ];
  } else if (id === "2") {
    return [
      {
        guest_name: "Sarah Wilson",
        room_type: "Presidential Suite",
        date_in: "2024-02-01T00:00:00.000Z",
        date_out: "2024-02-05T00:00:00.000Z",
        capacity: "2 Adults, 2 Children",
        additional: "Special dietary requirements",
      },
      {
        guest_name: "David Brown",
        room_type: "Executive Room",
        date_in: "2024-02-10T00:00:00.000Z",
        date_out: "2024-02-12T00:00:00.000Z",
        capacity: "1 Adult",
        additional: "Business meeting room access",
      },
    ];
  }

  // Default empty array for unknown IDs
  return [];
};

// Server-side paginated and sorted booking details
export const getReportBookingsWithPagination = async ({
  id,
  page = 1,
  pageSize = 10,
  sortBy = "date_in",
  sortOrder = "asc",
}: {
  id: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<ReportBookingsPaginatedResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get all data first
  const allBookings = await getReportDetails({ id });

  // Generate more data for pagination simulation
  const extendedBookings: ReportBooking[] = [];

  if (id === "1") {
    // Generate 50 booking records for report 1
    for (let i = 0; i < 50; i++) {
      const baseBooking = allBookings[i % allBookings.length];
      const dayOffset = Math.floor(i / 3);
      const dateIn = new Date("2024-01-15T00:00:00.000Z");
      dateIn.setDate(dateIn.getDate() + dayOffset);
      const dateOut = new Date(dateIn);
      dateOut.setDate(dateOut.getDate() + 2);

      extendedBookings.push({
        ...baseBooking,
        guest_name: `${baseBooking.guest_name} ${i + 1}`,
        date_in: dateIn.toISOString(),
        date_out: dateOut.toISOString(),
        additional: `${baseBooking.additional} - Booking #${i + 1}`,
      });
    }
  } else if (id === "2") {
    // Generate 30 booking records for report 2
    for (let i = 0; i < 30; i++) {
      const baseBooking = allBookings[i % allBookings.length];
      const dayOffset = Math.floor(i / 2);
      const dateIn = new Date("2024-02-01T00:00:00.000Z");
      dateIn.setDate(dateIn.getDate() + dayOffset);
      const dateOut = new Date(dateIn);
      dateOut.setDate(dateOut.getDate() + 3);

      extendedBookings.push({
        ...baseBooking,
        guest_name: `${baseBooking.guest_name} ${i + 1}`,
        date_in: dateIn.toISOString(),
        date_out: dateOut.toISOString(),
        additional: `${baseBooking.additional} - Booking #${i + 1}`,
      });
    }
  }

  // Sort the data based on sortBy and sortOrder
  const sortedBookings = [...extendedBookings].sort((a, b) => {
    let aValue: any = a[sortBy as keyof ReportBooking];
    let bValue: any = b[sortBy as keyof ReportBooking];

    // Handle date sorting
    if (sortBy === "date_in" || sortBy === "date_out") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Handle string sorting
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Paginate the sorted data
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedBookings.slice(startIndex, endIndex);

  const totalCount = sortedBookings.length;
  const pageCount = Math.ceil(totalCount / pageSize);

  return {
    data: paginatedData,
    pageCount,
    totalCount,
  };
};

export async function getCompanyOptions() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { label: "Esensi Digital", value: "esensi digital" },
    { label: "WTM Digital", value: "wtm digital" },
    { label: "Other Company", value: "other company" },
  ];
}

export async function getHotelOptions() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { label: "Grand Hotel Jakarta", value: "Grand Hotel Jakarta" },
    { label: "Hotel Indonesia", value: "hotel Indonesia" },
    { label: "Other Hotel", value: "other hotel" },
  ];
}
