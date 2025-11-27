import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import formattedDateAndTimeStrict from "@/utils/format-date-time-strict";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export default function IsEdited({ date }: { date: Date | string }) {
  return (
    <>
      <span className="text-gray-500 font-bold text-[8px]">•</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-blue-500 font-bold text-[8px]">Edited</span>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <small className="text-gray-400 text-[10.3px] italic">
            {formattedDateAndTimeStrict(new Date(date))}
          </small>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
