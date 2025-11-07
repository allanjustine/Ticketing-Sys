import { Ticket, TicketCheck, Tickets, TicketX } from "lucide-react";
import AutomationRecentTicketTransactions from "./automation-recent-ticket-transactions";
import AutomationTopCards from "./automation-top-cards";

export default function AutomationDashboard({ data, isLoading }: any) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        <div>
          <AutomationTopCards
            isLoading={isLoading}
            data={data?.ticket_totals?.all_tickets_assigned}
            Icon={Tickets}
            title="Overall Tickets Assigned"
            color="green"
          />
        </div>
        <div>
          <AutomationTopCards
            isLoading={isLoading}
            data={data?.ticket_totals?.all_edited_tickets_assigned}
            Icon={TicketCheck}
            title="Edited Tickets Assigned"
            color="blue"
          />
        </div>
        <div>
          <AutomationTopCards
            isLoading={isLoading}
            data={data?.ticket_totals?.all_pending_tickets_assigned}
            Icon={Ticket}
            title="Pending Tickets Assigned"
            color="yellow"
          />
        </div>
        <div>
          <AutomationTopCards
            isLoading={isLoading}
            data={data?.ticket_totals?.all_rejected_tickets_assigned}
            Icon={TicketX}
            title="Rejected Tickets Assigned"
            color="red"
          />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-lg text-gray-700 font-bold">
          Recent Ticket Transactions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-1">
          <div className="w-full">
            <AutomationRecentTicketTransactions
              recentTickets={data?.recent_tickets?.recent_pending_tickets}
              isLoading={isLoading}
              title="Pending"
              Icon={Ticket}
            />
          </div>
          <div className="w-full">
            <AutomationRecentTicketTransactions
              recentTickets={data?.recent_tickets?.recent_edited_tickets}
              isLoading={isLoading}
              title="Edited"
              Icon={TicketCheck}
            />
          </div>
          <div className="w-full">
            <AutomationRecentTicketTransactions
              recentTickets={data?.recent_tickets?.recent_rejected_tickets}
              isLoading={isLoading}
              title="Rejected"
              Icon={TicketX}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
