"use client";

import { Table } from "@tanstack/react-table";
import { PlusCircle, X } from "lucide-react";

import { DataTableFacetedFilter } from "@/components/data-table/faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/view-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const agents = [
  {
    value: "esensi digital",
    label: "Esensi Digital",
    icon: HelpCircle,
  },
  {
    value: "quavo",
    label: "Quavo",
    icon: Circle,
  },
  {
    value: "vevo",
    label: "Vevo",
    icon: Timer,
  },
];

export const promo_groups = [
  {
    label: "Group A",
    value: "group_a",
    icon: ArrowDown,
  },
  {
    label: "Group B",
    value: "group_b",
    icon: ArrowRight,
  },
  {
    label: "Group C",
    value: "group_c",
    icon: ArrowUp,
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("agent") && (
          <DataTableFacetedFilter
            column={table.getColumn("agent")}
            title="Agent"
            options={agents}
          />
        )}
        {table.getColumn("promo_group") && (
          <DataTableFacetedFilter
            column={table.getColumn("promo_group")}
            title="Promo Group"
            options={promo_groups}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">
          <PlusCircle />
          Add
        </Button>
      </div>
    </div>
  );
}
