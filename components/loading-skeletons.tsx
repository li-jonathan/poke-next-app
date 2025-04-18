
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonsProps {
  count: number;
}

export default function LoadingSkeletons({ count }: LoadingSkeletonsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-300 p-6 rounded-xl w-full "
        >
          <div className="flex justify-end my-2">
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md">
            <Skeleton className="h-full object-contain p-4" />
          </div>
          <div className="text-2xl font-semibold capitalize my-2 text-left">
            <Skeleton className="h-8 w-36" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
