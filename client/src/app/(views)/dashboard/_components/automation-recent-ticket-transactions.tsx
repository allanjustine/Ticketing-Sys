import RecentTicketTransactionsLoader from "@/components/loaders/recent-edited-ticket-transaction-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import formatDateAndTime from "@/utils/format-date-and-time";
import statusColor from "@/utils/ticket-status-color";
import ticketTypeUpperCase from "@/utils/ticket-type-upper-case";
import Link from "next/link";

export default function AutomationRecentTicketTransactions({
  recentTickets,
  isLoading,
  title,
  Icon,
}: {
  recentTickets: any;
  isLoading: boolean;
  title: string;
  Icon: any;
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="lg:text-sm text-lg xl:text-lg font-semibold flex items-center gap-2">
          <Icon size={18} />
          {title} tickets
        </CardTitle>
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-1.5 text-[9px] rounded-md font-bold"
          href={
            title === "Edited"
              ? "/reports"
              : `/tickets?status=${title.toUpperCase()}`
          }
        >
          View tickets
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <RecentTicketTransactionsLoader />
          ) : recentTickets.length > 0 ? (
            recentTickets.map((ticket: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div className="space-y-2">
                  <p className="font-medium">
                    {ticket.ticket_code} -{" "}
                    {ticket.ticket_detail.ticket_category.category_name}
                  </p>
                  <p className="flex gap-1 items-center text-xs">
                    <span className="font-bold text-gray-600">Edited by: </span>{" "}
                    <span>{ticket?.edited_by?.full_name}</span>
                  </p>
                  <p className="flex gap-1 items-center text-xs">
                    <span className="font-bold text-gray-600">
                      Ticket type:{" "}
                    </span>{" "}
                    <span
                      className={`font-bold ${
                        ticket?.ticket_detail?.tickey_type === "sql_ticket"
                          ? "text-cyan-500"
                          : "text-blue-500"
                      }`}
                    >
                      {ticketTypeUpperCase(ticket?.ticket_detail?.ticket_type)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDateAndTime(
                      ticket.ticket_detail.ticket_transaction_date
                    )}
                  </p>
                </div>
                <Badge
                  className={`border ${statusColor(ticket.status)} capitalize`}
                >
                  {ticket.status.toLowerCase()}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-sm font-bold text-gray-600">
              No recent {title} ticket transactions
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
