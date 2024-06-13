import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import EtherIcon from "@ark-market/ui/components/icons/ether-icon";
import { Separator } from "@ark-market/ui/components/separator";
import { cn } from "@ark-market/ui/lib/utils";

import type { CollectionInfosApiResponse } from "../queries/getCollectionData";

interface CollectionHeaderStatsProps {
  collectionInfos: CollectionInfosApiResponse;
}
const separatorCommonClassNames = "hidden md:block";

export default function CollectionHeaderStats({
  className,
  collectionInfos,
}: PropsWithClassName<CollectionHeaderStatsProps>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center justify-between gap-2 md:flex md:h-12 md:gap-6 md:pr-5",
        className,
      )}
    >
      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Floor</p>
        <div className="flex items-center gap-1 font-medium">
          <EtherIcon />
          <p>{collectionInfos.floor ?? "_"} ETH</p>
          {/* TODO @YohanTz: Proper color */}
          <p
            className={cn(
              "text-sm font-semibold",
              collectionInfos.floor_7d_percentage < 0
                ? "text-red-500"
                : "text-green-500",
            )}
          >
            {collectionInfos.floor_7d_percentage >= 0 && "+"}
            {collectionInfos.floor_7d_percentage}%
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">
          Total Volume
        </p>
        <p className="font-medium">{collectionInfos.total_volume ?? "_"} ETH</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">7D Volume</p>
        <p className="font-medium">
          {collectionInfos.volume_7d_eth ?? "_"} ETH
        </p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
        <p className="font-medium">{collectionInfos.total_sales ?? 0}</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Items</p>
        <p className="font-medium">{collectionInfos.token_count ?? 0}</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Owners</p>
        <p className="font-medium">{collectionInfos.owner_count ?? 0}</p>
      </div>
    </div>
  );
}
