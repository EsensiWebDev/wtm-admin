import { userSuperAdmin } from "@/app/(dashboard)/account/user-management/data-super-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you would fetch from your Spring Boot backend
    // const response = await fetch('http://localhost:8080/api/users/super-admin');
    // const data = await response.json();

    return NextResponse.json({
      success: true,
      data: userSuperAdmin,
    });
  } catch (error) {
    console.error("Error fetching super admin users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
