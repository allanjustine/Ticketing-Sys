import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

function InfoField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
        {icon}
        {label}
      </span>
      <Tooltip>
        <TooltipTrigger
          className="text-sm truncate text-left text-gray-700 font-medium"
          asChild
        >
          <span>{value}</span>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          {value}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function NoteCard({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
        {label}
      </span>
      <p className="text-sm text-gray-700 wrap-break-word leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export { InfoField, NoteCard };
