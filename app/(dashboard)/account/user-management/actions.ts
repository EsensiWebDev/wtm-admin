"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { SuperAdmin } from "./data-super-admin";

// Validation schema for user creation/update
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  agent: z.string().min(1, "Agent is required"),
  promo_group: z.string().min(1, "Promo group is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  status: z.boolean().default(true),
});

export async function createUser(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      agent: formData.get("agent") as string,
      promo_group: formData.get("promo_group") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") === "true",
    };

    // Validate the data
    const validatedData = userSchema.parse(rawData);

    // In a real app, you would send this to your Spring Boot backend
    // const response = await fetch('http://localhost:8080/api/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData)
    // });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    const newUser: SuperAdmin = {
      id: Date.now(), // In real app, this would come from the backend
      ...validatedData,
    };

    console.log({ newUser });

    // Revalidate the page to refresh the data
    revalidatePath("/account/user-management");

    return { success: true, data: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to create user" };
  }
}

export async function updateUser(id: number, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      agent: formData.get("agent") as string,
      promo_group: formData.get("promo_group") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") === "true",
    };

    // Validate the data
    const validatedData = userSchema.parse(rawData);

    // In a real app, you would send this to your Spring Boot backend
    // const response = await fetch(`http://localhost:8080/api/users/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData)
    // });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    const updatedUser: SuperAdmin = {
      id,
      ...validatedData,
    };

    console.log({ updatedUser });

    // Revalidate the page to refresh the data
    revalidatePath("/account/user-management");

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(id: number) {
  try {
    // In a real app, you would send this to your Spring Boot backend
    // const response = await fetch(`http://localhost:8080/api/users/${id}`, {
    //   method: 'DELETE'
    // });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    // In a real app, you would check the response status

    console.log("User deleted");

    // Revalidate the page to refresh the data
    revalidatePath("/account/user-management");

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
