"use server";

import { EditHotelSchema } from "@/components/dashboard/hotel-listing/dialog/edit-hotel-dialog";

export async function deleteHotel(hotelId: string) {
  console.log("Delete Hotel");
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success response
  return { success: true, message: `Hotel deleted` };
}

export async function createHotel(formData: FormData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Extract data from FormData
    const hotelInfo = JSON.parse(formData.get("hotelInfo") as string);
    const rooms = JSON.parse(formData.get("rooms") as string);
    const images = formData.getAll("images") as File[];
    const mainImageIndex = formData.get("mainImageIndex") as string;

    // Validate required data
    if (!hotelInfo.name || !hotelInfo.location || !hotelInfo.description) {
      return { success: false, error: "Missing required hotel information" };
    }

    if (images.length === 0) {
      return { success: false, error: "At least one image is required" };
    }

    if (rooms.length === 0) {
      return { success: false, error: "At least one room is required" };
    }

    // Simulate successful creation
    console.log("Hotel created successfully:", {
      hotelInfo,
      roomsCount: rooms.length,
      imagesCount: images.length,
      mainImageIndex,
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating hotel:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create hotel",
    };
  }
}

export async function editHotel(input: EditHotelSchema & { id: string }) {
  console.log("Edit Hotel:");
  console.log({ input });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success response
  return { success: true, message: `Hotel edited` };
}
