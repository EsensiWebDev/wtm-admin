"use client";

import { SuperAdmin } from "@/app/(dashboard)/account/user-management/data-super-admin";
import { UserForm } from "@/components/dashboard/account/user-management/user-form";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<SuperAdmin>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent Name" />
    ),
    cell: ({ row }) => {
      return row.original.name;
    },
    enableHiding: false,
  },
  {
    accessorKey: "agent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent Company" />
    ),
    cell: ({ row }) => {
      return row.original.agent;
    },
  },
  {
    accessorKey: "promo_group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Promo Group" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <Label htmlFor={`${row.original.id}-promo-group`} className="sr-only">
            Promo Group
          </Label>
          <Select defaultValue={row.original.promo_group}>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-promo-group`}
            >
              <SelectValue placeholder="Assign promo group" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="group_a">Promo Group A</SelectItem>
              <SelectItem value="group_b">Promo Group B</SelectItem>
              <SelectItem value="group_c">Promo Group C</SelectItem>
              <SelectSeparator />
              {/* <SelectItemLink href={"/dummy"}>Create New Group</SelectItemLink> */}
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    // cell: ({ row }) => {
    //   return row.original.email;
    // },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    // cell: ({ row }) => {
    //   return row.original.phone;
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleDelete = async () => {
        setIsDeleting(true);
        try {
          // Simulate API call - replace with your actual API call
          console.log("Deleting user:");
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Simulate success response
          const success = Math.random() > 0.2; // 80% success rate for demo
          if (success) {
            // onDelete(user.id);
            toast.success("User deleted successfully!");
            setIsDeleteDialogOpen(false); // Close dialog only on success
          } else {
            toast.error("Failed to delete user. Please try again.");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("An unexpected error occurred. Please try again.");
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                  size="icon"
                >
                  <IconDotsVertical />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Make changes to the user profile. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <UserForm
                initialData={{
                  name: "DUMMY",
                  email: "DUMMY",
                  phone: "DUMMY",
                  status: true,
                }}
                onSubmit={async (data: {
                  name: string;
                  email: string;
                  phone: string;
                  status: boolean;
                }) => {
                  try {
                    // Simulate API call - replace with your actual API call
                    console.log("Editing user:", data);

                    // Simulate network delay
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    // Simulate success response
                    const success = Math.random() > 0.2; // 80% success rate for demo

                    if (success) {
                      // Call the onEdit callback if provided
                      // onEdit(user.id, data);
                      return true;
                    } else {
                      // Keep modal open on failure
                      return false;
                    }
                  } catch (error) {
                    console.error("Error editing user:", error);
                    return false;
                  }
                }}
                onCancel={() => {}}
                submitButtonText="Save changes"
              />
            </DialogContent>
          </Dialog>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                className={buttonVariants({ variant: "destructive" })}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
