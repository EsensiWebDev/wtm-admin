import { SuperAdmin } from "@/app/(dashboard)/account/user-management/data-super-admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch super admin users
export function useSuperAdminUsers() {
  return useQuery({
    queryKey: ["users", "super-admin"],
    queryFn: async (): Promise<SuperAdmin[]> => {
      const response = await fetch("/api/users/super-admin");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Omit<SuperAdmin, "id">) => {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("agent", userData.agent);
      formData.append("promo_group", userData.promo_group);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("status", userData.status.toString());

      const response = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create user");
      console.error("Create user error:", error);
    },
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      userData,
    }: {
      id: number;
      userData: Omit<SuperAdmin, "id">;
    }) => {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("agent", userData.agent);
      formData.append("promo_group", userData.promo_group);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("status", userData.status.toString());

      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update user");
      console.error("Update user error:", error);
    },
  });
}
