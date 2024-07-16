import { cn, ellipsableStyles } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import type { Token } from "~/types";
import Media from "~/components/media";

interface tokenActionsTokenOverviewProps {
  token: Token;
  amount: string;
  small?: boolean;
}

export default function TokenActionsTokenOverview({
  token,
  amount,
  small,
}: tokenActionsTokenOverviewProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Media
          src={token.metadata?.image}
          mediaKey={token.metadata?.image_key}
          alt={token.metadata?.name ?? "Empty"}
          className={cn(
            "aspect-square w-full flex-shrink-0 object-contain transition-transform group-hover:scale-110",
            "overflow-hidden rounded-xl",
            small ? "size-16" : "size-16 sm:size-24",
          )}
          height={192}
          width={192}
        />

        <div className="flex flex-col items-start justify-between overflow-hidden">
          <div className={cn("w-full text-xl font-semibold", ellipsableStyles)}>
            #{token.token_id}
          </div>
          <div className="flex w-full items-center gap-1 sm:gap-2">
            <p
              className={cn(
                "text-sm font-semibold text-muted-foreground sm:text-lg",
                ellipsableStyles,
              )}
            >
              {token.collection_name || "Unknown"}
            </p>
            <VerifiedIcon className="size-4 flex-shrink-0 text-background sm:size-6" />
          </div>
          {small ?? (
            <div
              className={cn(
                "w-full items-center rounded-full text-xs font-medium text-secondary-foreground sm:mt-4 sm:flex sm:h-6 sm:w-auto sm:bg-secondary sm:px-2",
                ellipsableStyles,
              )}
            >
              Royalties 5%
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex whitespace-nowrap text-lg font-semibold sm:text-xl">
          <EthereumLogo2 className="size-6" />
          {amount || "---"} ETH
        </div>
        <div className="text-right text-sm font-semibold text-muted-foreground">
          $---
        </div>
      </div>
    </div>
  );
}
