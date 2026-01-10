"use client";
import { Skeleton } from "@/components/ui/skeleton";

const LeadsClientSkeleton = () => {
  return (
    <div className="p-6">
      <Skeleton className="h-8 w-32 mb-4" />
      <Skeleton className="h-5 w-64 mb-6" />

      <div className="border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="border-b">
          <div className="flex gap-4 p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="border-b last:border-b-0">
            <div className="flex gap-4 p-4">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsClientSkeleton;
