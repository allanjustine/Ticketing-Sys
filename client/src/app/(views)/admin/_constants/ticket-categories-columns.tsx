import { Badge } from "@/components/ui/badge";

export const TICKET_CATEGORIES_COLUMNS = [
  {
    name: "Alias",
    cell: (row: any) => row?.category_shortcut,
    sortable: false,
  },
  {
    name: "Category",
    cell: (row: any) => row?.category_name,
    sortable: false,
  },
  {
    name: "Total sub categories",
    cell: (row: any) =>
      row?.sub_categories_count > 0 ? (
        <Badge variant={"default"} className="text-[9px] bg-blue-400">
          {`${row?.sub_categories_count} sub categories`}
        </Badge>
      ) : (
        <Badge variant={"destructive"} className="text-[9px]">
          No sub categories applied
        </Badge>
      ),
    sortable: false,
  },
  {
    name: "Approver",
    cell: (row: any) => row?.group_category?.group_code,
    sortable: false,
  },
];
