import { columns } from "@/components/dashboard/account/user-management/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { SuperAdmin, userSuperAdmin } from "./data-super-admin";

async function getData(): Promise<SuperAdmin[]> {
  // Fetch data from your API here.

  return userSuperAdmin;
}

const UserManagement = async () => {
  const data = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Management</h1>
      <Tabs
        defaultValue="super_admin"
        className="w-full flex-col justify-start gap-6"
      >
        <TabsList>
          <TabsTrigger value="super_admin">super_admin</TabsTrigger>
          <TabsTrigger value="agent">agent</TabsTrigger>
          <TabsTrigger value="admin">admin</TabsTrigger>
          <TabsTrigger value="support">support</TabsTrigger>
        </TabsList>
        <TabsContent value="super_admin">
          <DataTable data={data} columns={columns} />
        </TabsContent>
        <TabsContent value="agent">
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed justify-center flex items-center text-xl">
            Agent
          </div>
        </TabsContent>
        <TabsContent value="admin">
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed justify-center flex items-center text-xl">
            admin
          </div>
        </TabsContent>
        <TabsContent value="support">
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed justify-center flex items-center text-xl">
            support
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
