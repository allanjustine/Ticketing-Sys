import { Skeleton } from "@/components/ui/skeleton";

export default function CommentLoader() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Skeleton
            className="h-8 w-8 rounded-full mx-3 my-1.5 self-start"
            style={{ animationDelay: `${index * 0.5}s` }}
          ></Skeleton>
          <div className="space-y-2 px-3 py-1.5 rounded-xl">
            <Skeleton
              className={`text-sm font-semibold h-5 ${
                index % 2 === 0 ? "w-52" : "w-36"
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            ></Skeleton>
            <Skeleton
              className={`text-xs text-gray-500 ${
                index % 2 === 0 ? "w-46 h-3" : "w-68 h-3"
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            ></Skeleton>
            {index % 2 === 0 && (
              <Skeleton
                className={`text-xs text-gray-500 ${
                  index % 2 === 0 ? "w-36 h-3" : "w-32 h-3"
                }`}
                style={{ animationDelay: `${index * 0.5}s` }}
              ></Skeleton>
            )}
            <div className="flex gap-1">
              <Skeleton
                className={`text-xs text-gray-500 w-12 h-3`}
                style={{ animationDelay: `${index * 0.5}s` }}
              ></Skeleton>
              <Skeleton
                className={`text-xs text-gray-500 w-12 h-3`}
                style={{ animationDelay: `${index * 0.5}s` }}
              ></Skeleton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
