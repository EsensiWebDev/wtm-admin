"use server";

import { CreateAdminSchema } from "@/components/dashboard/account/user-management/admin/dialog/create-admin-dialog";
import { EditAdminSchema } from "@/components/dashboard/account/user-management/admin/dialog/edit-admin-dialog";

export async function updateAdminStatus(adminId: string, status: boolean) {
  console.log("Update Admin Status");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: `Admin status updated to ${status ? "Active" : "Inactive"}`,
  };
}

export async function deleteAdmin(adminId: string) {
  console.log("Delete Admin");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Admin deleted` };
}

export async function createAdmin(input: CreateAdminSchema) {
  console.log("Create Admin:");
  console.log({ input });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Admin created` };
}

export async function editAdmin(input: EditAdminSchema & { id: string }) {
  console.log("Edit Admin:");
  console.log({ input });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Admin edited` };
}
