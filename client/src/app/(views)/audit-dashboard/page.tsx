"use client";

import DataTableComponent from "@/components/data-table";
import useFetch from "@/hooks/use-fetch";
import { TICKETS_COLUMNS } from "../dashboard/_constants/tickets-columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Funnel, Ticket } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ViewTicketDetails } from "@/app/(views)/tickets/_components/view-ticket-details";
import withAuthPage from "@/lib/hoc/with-auth-page";
import { TICKETS_FILTER } from "@/constants/filter-by";
import { useAuth } from "@/context/auth-context";
import SearchInput from "@/components/ui/search-input";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipArrow, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Label } from "@/components/ui/label";
import ButtonLoader from "@/components/ui/button-loader";
import Swal from "sweetalert2";

function Tickets() {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    handleSearchTerm,
    handlePageChange,
    handlePerPageChange,
    handleShort,
    filterBy,
    pagination,
    handleSelectFilter,
    handleReset,
    setIsRefresh,
    setIsLoading,
  } = useFetch({
    url: "/audit-dashboard-tickets",
    isPaginated: true,
    filters: TICKETS_FILTER,
  });
  const [selectedTicketData, setSelectedTicketData] = useState<null | any>(
    null,
  );
  const [isOpenView, setIsOpenView] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const role = user?.user_role?.role_name;

  const TICKET_COLUMNS_ACTIONS = [
    {
      name: "Action",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleDialogOpen(row, "view")}
                className="border-none bg-transparent shadow-none hover:scale-105"
              >
                <Eye className="h-4 w-4 text-green-500 hover:text-green-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              View Ticket
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    Swal.close();
  }, []);

  const handleDialogOpen = (data: any, type: string) => () => {
    setSelectedTicketData(data);

    switch (type) {
      case "view":
        setIsOpenView(true);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Card className="gap-0">
        <CardHeader>
          <CardTitle className="font-bold text-lg dark:text-white text-gray-600 flex items-center gap-1">
            <Funnel size={18} />
            <span>Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ticket_type" className="px-1">
                Filter by ticket type
              </Label>
              <Select
                onValueChange={handleSelectFilter("ticket_type")}
                value={filterBy.ticket_type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by ticket type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Filter by ticket type" disabled>
                      Filter by ticket type
                    </SelectItem>
                    <SelectItem value="ALL">ALL</SelectItem>
                    <SelectItem value="netsuite_ticket">
                      Netsuite Ticket
                    </SelectItem>
                    <SelectItem value="sql_ticket">SQL Ticket</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
              <Label htmlFor="search" className="px-1">
                Search
              </Label>
              <SearchInput
                onChange={handleSearchTerm(1000)}
                value={filterBy.defaultSearchValue}
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={handleReset}
            variant="ghost"
            className="bg-yellow-400 text-white hover:bg-yellow-500 hover:text-white mt-2 float-end"
          >
            Reset
          </Button>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold text-lg dark:text-white text-gray-600 flex items-center gap-1">
              <Ticket size={18} />
              <span>Requested Tickets</span>
            </CardTitle>
            <div className="flex gap-1">
              <div>
                <ButtonLoader
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600"
                  isLoading={isLoading}
                  onClick={() => {
                    setIsRefresh(true);
                    setIsLoading(true);
                  }}
                >
                  Refresh
                </ButtonLoader>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTableComponent
            data={data?.data?.data}
            columns={[...TICKETS_COLUMNS, ...TICKET_COLUMNS_ACTIONS]}
            loading={isLoading}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            handleShort={handleShort}
            column={pagination.sortBy}
            direction={pagination.sortDirection}
            pageTotal={pagination.totalRecords}
            searchTerm={filterBy.search}
            perPage={pagination.perPage}
            currentPage={pagination.page}
          />
        </CardContent>
      </Card>

      {isOpenView && (
        <ViewTicketDetails
          data={selectedTicketData}
          open={isOpenView}
          setOpen={setIsOpenView}
          setNote={setNote}
          role={role}
          note={note}
        />
      )}
    </div>
  );
}

export default withAuthPage(Tickets, false, true);
