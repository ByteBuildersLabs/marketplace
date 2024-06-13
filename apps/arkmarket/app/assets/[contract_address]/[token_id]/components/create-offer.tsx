"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { Button } from "@ark-market/ui/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ark-market/ui/components/form";
import { Input } from "@ark-market/ui/components/input";
import { areAddressesEqual } from "@ark-market/ui/lib/utils";

import type { Token, TokenMarketData } from "~/types/schema";
import { env } from "~/env";
import TokenMedia from "./token-media";

interface CreateOfferProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function CreateOffer({
  token,
  tokenMarketData,
}: CreateOfferProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { account, address } = useAccount();
  const { response, createOffer, status } = useCreateOffer();
  const isOwner = address && areAddressesEqual(token.owner, address);
  const formSchema = z.object({
    startAmount: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  useEffect(() => {
    if (response) {
      setIsOpen(false);
    }
  }, [response]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      return;
    }

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      currencyAddress: config?.starknetCurrencyContract,
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });
  }

  if (!account || isOwner) {
    return;
  }

  const isDisabled = form.formState.isSubmitting || status === "loading";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-[320px]">Make offer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make offer</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          <div className="w-16 overflow-hidden rounded">
            <TokenMedia token={token} />
          </div>
          <div className="">
            <div className="font-bold">Duo #{token.token_id}</div>
            <div className="text-muted-foreground">Everai</div>
          </div>
          <div className="grow" />
          <div className="">
            <div className="text-right font-bold">
              {tokenMarketData?.is_listed
                ? formatEther(BigInt(tokenMarketData.start_amount))
                : "-"}{" "}
              ETH
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="startAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isDisabled}>
              {status === "loading" ? (
                <ReloadIcon className="animate-spin" />
              ) : (
                "Create Offer"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
