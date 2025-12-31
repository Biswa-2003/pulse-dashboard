import Shimmer from "@/components/atoms/Shimmer";

export default function TokenCardSkeleton() {
    return (
        <div className="bg-[#0B0D11] border border-white/[0.04] rounded-lg p-2.5 h-[130px] flex flex-col justify-between">
            <div className="flex gap-2.5">
                {/* Logo Skeleton */}
                <Shimmer className="w-[3.5rem] h-[3.5rem]" />

                <div className="flex-1 flex flex-col gap-2">
                    {/* Top Row */}
                    <div className="flex justify-between">
                        <Shimmer className="h-4 w-20" />
                        <Shimmer className="h-4 w-12" />
                    </div>
                    {/* Second Row */}
                    <div className="flex justify-between">
                        <Shimmer className="h-3 w-24" />
                        <Shimmer className="h-3 w-10" />
                    </div>
                </div>
            </div>

            {/* Bottom Rows */}
            <div className="flex justify-between items-end mt-2">
                <div className="flex gap-1">
                    <Shimmer className="h-3 w-8" />
                    <Shimmer className="h-3 w-8" />
                    <Shimmer className="h-3 w-8" />
                </div>
                <Shimmer className="h-6 w-16 navbar-button" />
            </div>
        </div>
    );
}
