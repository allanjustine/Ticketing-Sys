import CarouselLayout from "@/components/carousel-layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROLE } from "@/constants/roles";
import { TICKET_STATUS } from "@/constants/ticket-status";
import { useAuth } from "@/context/auth-context";
import formattedDateFull from "@/utils/format-date-full";
import { isImage } from "@/utils/image-format";
import {
  isAccountingStaffApprover,
  isApprovers,
  isAutomation,
} from "@/utils/is-approvers";
import Storage from "@/utils/storage";
import ticketTypeUpperCase from "@/utils/ticket-type-upper-case";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Eye, FileSpreadsheet, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export function ViewTicketDetails({
  data,
  open,
  setOpen,
  setNote,
  setIsCounted,
  role,
  error,
  isCounted,
  handleApproveTicket,
  handleEditTicket,
  handleReviseTicket,
}: any) {
  const { user } = useAuth();
  const isYourPendingTicket = user?.login_id === data?.pending_user?.login_id;
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const TICKET_REJECTED = data?.status === TICKET_STATUS.REJECTED;
  const AUTOMATION_MANAGER =
    user?.user_role?.role_name === ROLE.AUTOMATION_MANAGER;
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const [defaultNote, setDefaultNote] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    setDefaultNote(
      isAutomation(role)
        ? data?.ticket_detail?.td_note ?? ""
        : data?.ticket_detail?.td_note_bh ?? ""
    );
  }, [open]);

  const handleSelectImage = (specificItem: any, items: any[]) => () => {
    setImages(items);
    setImage(specificItem);
    setOpenImage(true);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDefaultNote(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setNote(value);
    }, 500);
  };

  const handleOpenChange = (value: boolean) => {
    setNote(defaultNote ?? "");
    setOpen(value);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-gray-700 text-lg">
                Viewing{" "}
                <span className="font-bold">{`${ticketTypeUpperCase(
                  data?.ticket_detail?.ticket_type
                )} - ${data?.ticket_code}`}</span>{" "}
                ticket from{" "}
                <span className="font-bold">
                  {data?.user_login.full_name} - {data?.branch_name}
                </span>
                ...
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto space-y-5">
            {data?.ticket_detail?.td_note_bh && (
              <div className="border p-2 flex flex-col gap-2 rounded-lg">
                <div className="text-gray-600 font-bold text-xl text-center">
                  Branch head note
                </div>
                <div className="text-sm wrap-break-word">
                  {data?.ticket_detail?.td_note_bh}
                </div>
              </div>
            )}
            {data?.ticket_detail?.td_note && (
              <div className="border p-2 flex flex-col gap-2 rounded-lg">
                <div className="text-gray-600 font-bold text-xl text-center">
                  Automation note
                </div>
                <div className="text-sm wrap-break-word">
                  {data?.ticket_detail?.td_note}
                </div>
              </div>
            )}
            {(isApprovers(role) || !isAccountingStaffApprover(role)) &&
              isYourPendingTicket &&
              !TICKET_REJECTED && (
                <>
                  <div className="p-2 border rounded-lg flex flex-col gap-2">
                    <div className="text-gray-600 font-bold text-xl text-center">
                      Enter note
                    </div>
                    <div className="flex flex-col gap-1">
                      <Textarea
                        placeholder="Enter note"
                        className="resize-none"
                        value={defaultNote}
                        onChange={handleChange}
                      />

                      {(error?.td_note ?? error?.td_note_bh) && (
                        <small className="text-red-500">
                          {error?.td_note
                            ? error?.td_note[0]
                            : error?.td_note_bh[0]}
                        </small>
                      )}
                    </div>
                  </div>
                  {isAutomation(role) && !AUTOMATION_MANAGER && (
                    <div className="p-2 border rounded-lg flex flex-col gap-2">
                      <div className="text-gray-600 font-bold text-xl text-center">
                        Is Counted?
                      </div>
                      <div className="flex flex-col gap-1">
                        <Select value={isCounted} onValueChange={setIsCounted}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select is counted" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Is Counted?</SelectLabel>
                              <SelectItem value="0">Yes</SelectItem>
                              <SelectItem value="1">No</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {error?.is_counted && (
                          <small className="text-red-500">
                            {error?.is_counted[0]}
                          </small>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            <div className="grid grid-cols-2 gap-4 border rounded-lg p-2">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-600">
                  Transaction Date
                </span>
                <Tooltip>
                  <TooltipTrigger className="text-sm truncate" asChild>
                    <span>
                      {formattedDateFull(
                        data?.ticket_detail?.ticket_transaction_date
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />

                    {formattedDateFull(
                      data?.ticket_detail?.ticket_transaction_date
                    )}
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-600">Ticket Category</span>
                <Tooltip>
                  <TooltipTrigger className="text-sm truncate" asChild>
                    <span>
                      {data?.ticket_detail?.ticket_category?.category_name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />

                    {data?.ticket_detail?.ticket_category?.category_name}
                  </TooltipContent>
                </Tooltip>
              </div>
              {data?.ticket_detail?.sub_category && (
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-gray-600">
                    Ticket Sub Category
                  </span>
                  <Tooltip>
                    <TooltipTrigger className="text-sm truncate" asChild>
                      <span>
                        {data?.ticket_detail?.sub_category?.sub_category_name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <TooltipArrow />

                      {data?.ticket_detail?.sub_category?.sub_category_name}
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
              {data?.ticket_detail?.td_ref_number && (
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-gray-600">
                    Ticket Reference Number
                  </span>
                  <Tooltip>
                    <TooltipTrigger className="text-sm truncate" asChild>
                      <span className=" font-bold text-gray-600">
                        {data?.ticket_detail?.td_ref_number}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <TooltipArrow />

                      {data?.ticket_detail?.td_ref_number}
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
            {data?.ticket_detail?.td_support?.length > 0 && (
              <div className="flex flex-col gap-2 border rounded-lg">
                <div className="text-gray-600 font-bold p-2">Support Files</div>
                <div className="flex gap-2 overflow-x-auto w-full h-28 overflow-y-hidden px-2">
                  {data?.ticket_detail?.td_support?.map(
                    (file: any, index: number) => (
                      <div
                        key={index}
                        className="group relative rounded-md border"
                      >
                        <div className="p-2 w-20 h-20 rounded-md">
                          {isImage(file) ? (
                            <Image
                              src={Storage(file)}
                              alt={file}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileSpreadsheet className="w-full h-full" />
                          )}

                          <p className="text-xs truncate">
                            {file?.split("/").pop()}
                          </p>
                        </div>

                        <div className="w-20 h-full group-hover:block hidden bg-black/60 absolute top-0 rounded-md z-50">
                          <Button
                            type="button"
                            className="w-full p-0 h-full hover:bg-transparent bg-transparent"
                            onClick={handleSelectImage(
                              file,
                              data?.ticket_detail?.td_support
                            )}
                          >
                            <Eye className="w-full h-full" />
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            <div className="p-2 border rounded-lg flex flex-col gap-4">
              <div className="text-gray-600 font-bold text-xl text-center">
                Other details
              </div>
              <div className="flex justify-evenly gap-4">
                {data?.approve_head && (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-600">Approved By</span>
                    <span className="text-xs">
                      {data?.approve_head?.full_name}
                    </span>
                  </div>
                )}
                {data?.last_approver && (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-600">
                      Last Approver
                    </span>
                    <span className="text-xs">
                      {data?.last_approver?.full_name}
                    </span>
                  </div>
                )}
                {data?.assigned_person && (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-600">Assigned To</span>
                    <span className="text-xs">
                      {data?.assigned_person?.full_name}
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {Array.isArray(data?.ticket_detail?.td_purpose)
                  ? Array.from(data?.ticket_detail?.td_purpose).length > 0
                  : data?.ticket_detail?.td_purpose && (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-600">Purpose</span>
                        <Tooltip>
                          <TooltipTrigger className="text-sm truncate" asChild>
                            <span>{data?.ticket_detail?.td_purpose}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <TooltipArrow />
                            {data?.ticket_detail?.td_purpose}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                {Array.isArray(data?.ticket_detail?.td_from)
                  ? Array.from(data?.ticket_detail?.td_from).length > 0
                  : data?.ticket_detail?.td_from && (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-600">From</span>
                        <Tooltip>
                          <TooltipTrigger className="text-sm truncate" asChild>
                            <span>{data?.ticket_detail?.td_from}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <TooltipArrow />
                            {data?.ticket_detail?.td_from}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                {Array.isArray(data?.ticket_detail?.td_to)
                  ? Array.from(data?.ticket_detail?.td_to).length > 0
                  : data?.ticket_detail?.td_to && (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-600">To</span>
                        <Tooltip>
                          <TooltipTrigger className="text-sm truncate" asChild>
                            <span>{data?.ticket_detail?.td_to}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <TooltipArrow />
                            {data?.ticket_detail?.td_to}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            {(isApprovers(role) || isAccountingStaffApprover(role)) &&
              isYourPendingTicket &&
              !TICKET_REJECTED && (
                <>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={handleReviseTicket(
                      data?.ticket_code,
                      data?.ticket_details_id
                    )}
                    className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
                  >
                    Revise
                  </Button>
                  {isAutomation(role) && !AUTOMATION_MANAGER ? (
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={handleEditTicket(
                        data?.ticket_code,
                        data?.ticket_details_id
                      )}
                      className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                    >
                      Mark as edited
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={handleApproveTicket(
                        data?.ticket_code,
                        data?.ticket_details_id
                      )}
                      className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
                    >
                      Approve
                    </Button>
                  )}
                </>
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog onOpenChange={setOpenImage} open={openImage}>
        <DialogContent className="bg-transparent border-none shadow-none sm:max-w-full h-fit!">
          <Button
            type="button"
            onClick={() => setOpenImage(false)}
            className="absolute top-20 right-5 font-bold bg-transparent hover:bg-black/20"
          >
            <X className="text-white stroke-4" />
          </Button>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="p-10">
            <CarouselLayout images={images} image={image} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
