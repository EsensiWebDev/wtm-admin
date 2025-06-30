import { SearchParams } from "@/types";

export interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

export interface AdminTableResponse {
  success: boolean;
  data: Admin[];
  pageCount: number;
}

export interface AdminPageProps {
  searchParams: Promise<SearchParams>;
}
