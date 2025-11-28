import { Badge } from "@/components/ui/badge";
import { ROLE } from "@/constants/roles";

const accountingHead = (row: any) => {
  return row?.user_role?.role_name === ROLE.ACCOUNTING_HEAD;
};

export const ACCOUNTINGS_COLUMNS = [
  {
    name: "Full Name",
    cell: (row: any) => row?.full_name,
    sortable: false,
  },
  {
    name: "Role",
    cell: (row: any) => row?.user_role?.role_name,
    sortable: false,
  },
  {
    name: "Assigned Categories",
    cell: (row: any) => (
      <>
        <div className="flex gap-1 flex-wrap p-2">
          {row?.assigned_categories?.length > 0 ? (
            row.assigned_categories.map((category: any, index: number) => (
              <Badge
                variant="outline"
                className="capitalize text-[10px] bg-blue-500 text-white"
                key={index}
              >
                {category?.category_group_code?.group_code}
              </Badge>
            ))
          ) : (
            <Badge variant={"destructive"}>
              <span className="text-red-100 font-bold text-xs">
                No assigned categories yet
              </span>
            </Badge>
          )}
        </div>
      </>
    ),
    sortable: false,
  },
  {
    name: "Assigned Branches",
    cell: (row: any) => (
      <>
        <div className="flex gap-1 flex-wrap p-2">
          {row?.accounting_assigned_branches?.length > 0 ? (
            row.accounting_assigned_branches.map(
              (branch: any, index: number) => (
                <Badge
                  variant="outline"
                  className="capitalize text-[10px] bg-blue-500 text-white"
                  key={index}
                >
                  {branch?.b_code}
                </Badge>
              )
            )
          ) : (
            <div
              className={`${
                accountingHead(row) ? "bg-gray-200" : "bg-red-500"
              } p-1.5 rounded-xl`}
            >
              <span
                className={`wrap-break-word ${
                  accountingHead(row) ? "text-gray-500" : "text-red-100"
                } font-bold text-xs`}
              >
                {accountingHead(row)
                  ? "Accounting Head does not need branches."
                  : "No assigned branches yet"}
              </span>
            </div>
          )}
        </div>
      </>
    ),
    sortable: false,
  },
];
