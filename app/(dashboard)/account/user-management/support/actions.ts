"use server";

import { CreateSupportSchema } from "@/components/dashboard/account/user-management/support/dialog/create-support-dialog";
import { EditSupportSchema } from "@/components/dashboard/account/user-management/support/dialog/edit-support-dialog";

export async function updateSupportStatus(supportId: string, status: boolean) {
  console.log("Update Support Status");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: `Support status updated to ${status ? "Active" : "Inactive"}`,
  };
}

export async function deleteSupport(supportId: string) {
  console.log("Delete Support");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Support deleted` };
}

export async function createSupport(input: CreateSupportSchema) {
  console.log("Create Support:");
  console.log({ input });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Support created` };
}

export async function editSupport(input: EditSupportSchema & { id: string }) {
  console.log("Edit Support:");
  console.log({ input });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Support edited` };
}
