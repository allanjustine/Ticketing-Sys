import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AutomationTopCards({
  isLoading,
  data,
  Icon,
  title,
  color,
}: any) {
  return (
    <Card
      className={`relative border-l-5 min-h-30 hover:bg-${color}-50 border-l-${color}-500 hover:border-l-${color}-600 shadow hover:scale-103 hover:shadow-lg transition-all duration-300 ease-in-out`}
    >
      <CardContent className="z-1">
        <CardTitle className="text-md font-bold text-gray-600">
          {title}
        </CardTitle>
        <CardDescription className="font-bold text-3xl">
          {isLoading ? <Skeleton className="h-10 w-10" /> : data}
        </CardDescription>
      </CardContent>
      <div className="absolute top-1/2 right-2 -translate-y-1/2">
        <Icon size={85} className="text-slate-200" />
      </div>
    </Card>
  );
}
