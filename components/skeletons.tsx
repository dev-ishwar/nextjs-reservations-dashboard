// Skeleton components for different UIs

import { Skeleton } from "./ui/skeleton"

export const TableSkeleton = ({ rows = 5 }: { rows: number }) => {
    return (
        <div className="flex flex-col gap-0.5">
            {
                Array(rows).fill(1).map((_, i) => (
                    <Skeleton key={i++} className="w-full h-6" />
                ))
            }
        </div>
    )
}