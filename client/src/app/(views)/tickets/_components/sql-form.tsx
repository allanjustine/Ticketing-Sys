import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SqlForm({ formInput, errors, handleInputChange }: any) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Label htmlFor="purpose" className="px-1">
          Purpose
        </Label>
        <Textarea
          value={formInput.purpose ?? ""}
          className="max-h-26 resize-none max-w-86"
          placeholder="Purpose"
          onChange={handleInputChange("purpose")}
        />
        {errors?.purpose && (
          <small className="text-red-500">{errors?.purpose[0]}</small>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="from" className="px-1">
          From
        </Label>
        <Input
          value={formInput.from ?? ""}
          className="w-full"
          placeholder="From"
          onChange={handleInputChange("from")}
        />
        {errors?.from && (
          <small className="text-red-500">{errors?.from[0]}</small>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="to" className="px-1">
          To
        </Label>
        <Input
          value={formInput.to ?? ""}
          className="w-full"
          placeholder="To"
          onChange={handleInputChange("to")}
        />
        {errors?.to && <small className="text-red-500">{errors?.to[0]}</small>}
      </div>
    </>
  );
}
