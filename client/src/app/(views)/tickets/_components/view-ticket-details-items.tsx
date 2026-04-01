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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useState } from "react";

function InfoField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
        {icon}
        {label}
      </span>
      <Tooltip>
        <TooltipTrigger
          className="text-sm truncate text-left text-gray-700 font-medium cursor-pointer"
          asChild
          onClick={() => setOpen(true)}
        >
          <span>{value}</span>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          {value}
        </TooltipContent>
      </Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <div className="break-all whitespace-break-spaces max-h-[calc(100vh-200px)] overflow-y-auto">{value}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NoteCard({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
        {label}
      </span>
      <p className="text-sm text-gray-700 break-all whitespace-break-spaces leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export { InfoField, NoteCard };
