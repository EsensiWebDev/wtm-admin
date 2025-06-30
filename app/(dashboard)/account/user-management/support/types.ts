import { SearchParams } from "@/types";

export interface Support {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

export interface SupportTableResponse {
  success: boolean;
  data: Support[];
  pageCount: number;
}

export interface SupportPageProps {
  searchParams: Promise<SearchParams>;
}
