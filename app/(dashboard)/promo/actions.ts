"use server";

import { apiCall } from "@/lib/api";
import { CreatePromoSchema, EditPromoSchema } from "./types";
import { revalidatePath } from "next/cache";

export async function updatePromoStatus(promoId: string, status: boolean) {
  console.log("Update Promo Status");
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success response
  return { success: true, message: `Promo status updated to ${status}` };
}

export async function deletePromo(promoId: string) {
  console.log("Delete Promo");
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success response
  return { success: true, message: `Promo deleted` };
}

export async function createPromo(input: any) {
  try {
    const body = {
      ...input,
    };

    console.log({ body });

    return {
      success: false,
      message: "force error",
    };

    const response = await apiCall("promos", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: response.message || "Failed to create promo",
      };
    }

    revalidatePath("/promo", "layout");

    return {
      success: true,
      message: response.message || "Promo created",
    };
  } catch (error) {
    console.error("Error creating promo:", error);

    // Handle API error responses with specific messages
    if (error && typeof error === "object" && "message" in error) {
      return {
        success: false,
        message: error.message as string,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create promo",
    };
  }
}

export async function editPromo(input: EditPromoSchema & { id: string }) {
  console.log("Edit Promo:");

  // Validate conditional fields based on type
  // if (input.type === "discount" && !input.discount_percentage) {
  //   return {
  //     success: false,
  //     message: "Discount percentage is required for discount type",
  //   };
  // }
  // if (input.type === "fixed_price" && !input.price_discount) {
  //   return {
  //     success: false,
  //     message: "Price discount is required for fixed price type",
  //   };
  // }
  // if (input.type === "room_upgrade" && !input.room_upgrade_to) {
  //   return {
  //     success: false,
  //     message: "Room upgrade destination is required for room upgrade type",
  //   };
  // }
  // if (input.type === "benefits" && !input.benefits) {
  //   return {
  //     success: false,
  //     message: "Benefits description is required for benefits type",
  //   };
  // }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success response
  return { success: true, message: "Promo updated successfully" };
}
