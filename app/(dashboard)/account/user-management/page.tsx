import AdminTable from "@/components/dashboard/account/user-management/admin/table/admin-table";
import AgentTable from "@/components/dashboard/account/user-management/agent/table/agent-table";
import SuperAdminTable from "@/components/dashboard/account/user-management/super-admin/table/super-admin-table";
import SupportTable from "@/components/dashboard/account/user-management/support/table/support-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParams } from "@/types";
import { Suspense } from "react";
import { AdminTableResponse } from "./admin/types";
import { AgentTableResponse } from "./agent/types";
import { SuperAdminTableResponse } from "./super-admin/types";
import { SupportTableResponse } from "./support/types";
import { UserManagementPageProps } from "./types";

export const getSuperAdminData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<SuperAdminTableResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: "1",
      name: "kelvin",
      email: "kelvin@wtmdigital.com",
      phone: "081234567800",
      status: true,
    },
    {
      id: "2",
      name: "budi",
      email: "budi@wtmdigital.com",
      phone: "081234567800",
      status: false,
    },
  ];

  return {
    success: true,
    data,
    pageCount: 2,
  };
};

export const getAgentData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<AgentTableResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: "1",
      name: "Riza",
      company: "WTM Digital",
      promo_group: "promo_a",
      email: "riza@wtmdigital.com",
      kakao_id: "riza_kakao",
      phone: "081234567801",
      status: true,
    },
    {
      id: "2",
      name: "Andi",
      company: "WTM Digital",
      promo_group: "promo_b",
      email: "andi@wtmdigital.com",
      kakao_id: "andi_kakao",
      phone: "081234567802",
      status: false,
    },
  ];

  return {
    success: true,
    data,
    pageCount: 2,
  };
};

export const getAdminData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<AdminTableResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: "1",
      name: "kelvin admin",
      email: "kelvin_admin@wtmdigital.com",
      phone: "081234567800",
      status: true,
    },
    {
      id: "2",
      name: "budi admin",
      email: "budi_admin@wtmdigital.com",
      phone: "081234567800",
      status: true,
    },
  ];

  return {
    success: true,
    data,
    pageCount: 2,
  };
};

export const getSupportData = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<SupportTableResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: "1",
      name: "kelvin support",
      email: "kelvin_support@wtmdigital.com",
      phone: "081234567800",
      status: false,
    },
    {
      id: "2",
      name: "budi support",
      email: "budi_support@wtmdigital.com",
      phone: "081234567800",
      status: false,
    },
  ];

  return {
    success: true,
    data,
    pageCount: 2,
  };
};

const UserManagementPage = async (props: UserManagementPageProps) => {
  const searchParams = await props.searchParams;

  const promisesSuperAdmin = Promise.all([
    getSuperAdminData({
      searchParams,
    }),
  ]);

  const promisesAgent = Promise.all([
    getAgentData({
      searchParams,
    }),
  ]);

  const promisesAdmin = Promise.all([
    getAdminData({
      searchParams,
    }),
  ]);

  const promisesSupport = Promise.all([
    getSupportData({
      searchParams,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      <Tabs
        defaultValue="super_admin"
        className="w-full flex-col justify-start gap-6"
      >
        <TabsList>
          <TabsTrigger value="super_admin">Super Admin</TabsTrigger>
          <TabsTrigger value="agent">Agent</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        <TabsContent value="super_admin">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                filterCount={1}
                cellWidths={["6rem", "10rem", "30rem", "10rem", "6rem", "6rem"]}
              />
            }
          >
            <SuperAdminTable promises={promisesSuperAdmin} />
          </Suspense>
        </TabsContent>
        <TabsContent value="agent">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                filterCount={1}
                cellWidths={["6rem", "10rem", "30rem", "10rem", "6rem", "6rem"]}
              />
            }
          >
            <AgentTable promises={promisesAgent} />
          </Suspense>
        </TabsContent>
        <TabsContent value="admin">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                filterCount={1}
                cellWidths={["6rem", "10rem", "30rem", "10rem", "6rem", "6rem"]}
              />
            }
          >
            <AdminTable promises={promisesAdmin} />
          </Suspense>
        </TabsContent>
        <TabsContent value="support">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                filterCount={1}
                cellWidths={["6rem", "10rem", "30rem", "10rem", "6rem", "6rem"]}
              />
            }
          >
            <SupportTable promises={promisesSupport} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagementPage;
