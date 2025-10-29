"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Option } from "@/types/data-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { AddMemberPromoGroupForm } from "../form/add-member-promo-group-form";
import { addPromoGroupMembers } from "@/app/(dashboard)/promo-group/actions";

export const addMemberPromoGroupSchema = z.object({
  agent_company_id: z.string().min(1, "Agent company is required"),
  member_id: z.string().min(1, "Member is required"),
});

export type AddMemberPromoGroupSchemaType = z.infer<
  typeof addMemberPromoGroupSchema
>;

interface AddMemberPromoGroupDialogProps {
  companyOptions: Option[];
  promoGroupId: string;
}

const AddMemberPromoGroupDialog = ({
  companyOptions,
  promoGroupId,
}: AddMemberPromoGroupDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<AddMemberPromoGroupSchemaType>({
    resolver: zodResolver(addMemberPromoGroupSchema),
    defaultValues: {
      agent_company_id: "",
      member_id: "",
    },
  });

  async function onSubmit(input: AddMemberPromoGroupSchemaType) {
    startTransition(async () => {
      const { success } = await addPromoGroupMembers({
        ...input,
        promo_group_id: promoGroupId,
      });

      if (!success) {
        toast.error("Failed to add member");
        return;
      }

      form.reset();
      setOpen(false);
      toast.success("Member added");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs">
          <PlusCircle />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Member To Promo Group</DialogTitle>
          <DialogDescription>
            Choose an agent company to filter members, then pick a member to add
          </DialogDescription>
        </DialogHeader>
        <AddMemberPromoGroupForm
          form={form}
          onSubmit={onSubmit}
          companyOptions={companyOptions}
          onCompanyChange={() => {
            // reset member selection when company changes
            form.setValue("member_id", "");
          }}
        >
          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending}>
              {isPending && <Loader className="animate-spin" />}
              Add
            </Button>
          </DialogFooter>
        </AddMemberPromoGroupForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberPromoGroupDialog;
