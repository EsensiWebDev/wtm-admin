"use server";

import { CreateSuperAdminSchema } from "@/components/dashboard/account/user-management/super-admin/dialog/create-super-admin-dialog";
import { EditSuperAdminSchema } from "@/components/dashboard/account/user-management/super-admin/dialog/edit-super-admin-dialog";
import { apiCall } from "@/lib/utils";

export async function createSuperAdmin(input: CreateSuperAdminSchema) {
  try {
    const body = {
      ...input,
      role: "super_admin",
    };

    const response = await apiCall("users", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      success: true,
      message: response.message ?? `Super Admin created`,
    };
  } catch (error) {
    console.error("Error creating super admin:", error);

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
        error instanceof Error ? error.message : "Failed to create super admin",
    };
  }
}

export async function editSuperAdmin(
  input: EditSuperAdminSchema & { id: string }
) {
  try {
    const body = {
      ...input,
      user_id: input.id,
    };

    const response = await apiCall("users", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    return {
      success: true,
      message: response.message ?? `Super Admin updated`,
    };
  } catch (error) {
    console.error("Error updating super admin:", error);

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
        error instanceof Error ? error.message : "Failed to update super admin",
    };
  }
}
