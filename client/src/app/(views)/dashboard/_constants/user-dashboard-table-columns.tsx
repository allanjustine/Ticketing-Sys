import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import formatDateAndTime from "@/utils/format-date-and-time";
import nameShortHand from "@/utils/name-short-hand";
import Storage from "@/utils/storage";
import statusColor from "@/utils/ticket-status-color";

export const USER_DASHBOARD_TABLE_COLUMNS = [
  {
    name: "Ticket Code",
    cell: (row: any) => row.ticket_code,
    sortable: false,
    sortField: "ticket_code",
  },
  {
    name: "Category",
    cell: (row: any) => row.ticket_detail.ticket_category.category_name,
    sortable: false,
    sortField: "ticket_categories.category_name",
  },
  {
    name: "Assigned Automation",
    cell: (row: any) => row.assigned_person.full_name,
    sortable: false,
    sortField: "user_details.fname",
  },
  {
    name: "Created At",
    cell: (row: any) => formatDateAndTime(row?.ticket_detail?.date_created),
    sortable: false,
    sortField: "date_created",
  },
  {
    name: "Transaction Date",
    cell: (row: any) =>
      formatDateAndTime(row.ticket_detail.ticket_transaction_date),
    sortable: false,
    sortField: "ticket_transaction_date",
  },
  {
    name: "Status",
    cell: (row: any) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge
            variant="outline"
            className={`${statusColor(
              row.status,
            )} capitalize text-[11px] font-bold`}
          >
            {row.status.toLowerCase()}
          </Badge>
        </HoverCardTrigger>
        {row?.pending_user && (
          <HoverCardContent className="w-80">
            <div className="flex flex-col space-y-2">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage
                    src={Storage(row?.pending_user?.user_detail?.profile_pic)}
                  />
                  <AvatarFallback className="font-bold">
                    {nameShortHand(row?.pending_user?.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {row?.pending_user?.full_name}
                  </h4>
                  <p className="font-bold italic text-gray-400">
                    {row?.pending_user?.user_role?.role_name}
                  </p>
                  <p className="text-sm">
                    {row.pending_user?.user_detail?.user_email}
                  </p>
                  <div className="text-muted-foreground text-xs">
                    {row?.pending_user?.branch ? (
                      <span
                        className={`px-2 py-1 text-[10px] font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-300`}
                      >
                        ({row.pending_user?.branch?.b_code}) -
                        {row.pending_user?.branch?.b_name}
                      </span>
                    ) : (
                      <span className="flex gap-1 flex-wrap max-w-[300px] max-h-[200px] overflow-y-auto">
                        {row?.pending_user?.branches?.map(
                          (branch: any, index: number) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-[10px] font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-300`}
                            >
                              ({branch?.b_code}) - {branch?.b_name}
                            </span>
                          ),
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t pt-2">
                <p className="text-xs text-gray-700">
                  <span className="font-bold">Approved by: </span>
                  {row.last_approver ? row.last_approver.full_name : "-"}
                </p>
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    ),
    sortable: false,
    sortField: "status",
  },
];
