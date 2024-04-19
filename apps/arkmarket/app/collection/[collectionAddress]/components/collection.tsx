"use client";

import React from "react";
import { useQuery } from "react-query";

import { fetchTokensMarketdata } from "../queries/fetchTokensMarketdata";
import { fetchTokensMetadata } from "../queries/fetchTokensMetadata";
import { mergeTokenData } from "../utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface CollectionProps {
  initialCollectionData: any;
  initialCollectionMarketData: any;
  collectionAddress: string;
}

export default function Collection({
  initialCollectionData,
  initialCollectionMarketData,
  collectionAddress,
}: CollectionProps) {
  const {
    data: collectionData,
    error: collectionDataError,
    isLoading: collectionDataIsLoading,
  }: any = useQuery(
    "tokens",
    async () => await fetchTokensMetadata(collectionAddress),
    {
      initialData: initialCollectionData,
      refetchInterval: 10_000,
    },
  );

  const {
    data: collectionMarketData,
    error: collectionMarketError,
    isLoading: collectionMarketIsLoading,
  }: any = useQuery(
    "collectionMarket",
    async () => await fetchTokensMarketdata(collectionAddress),
    {
      initialData: initialCollectionMarketData,
      refetchInterval: 10_000,
    },
  );

  if (collectionDataIsLoading || collectionMarketIsLoading) {
    return <div>Loading...</div>;
  }

  if (collectionDataError || collectionMarketError) {
    return (
      <div>
        Error missing data:{" "}
        {collectionDataError
          ? collectionDataError.message
          : collectionMarketError.message}
      </div>
    );
  }

  const tokenWithMarketData = mergeTokenData(
    collectionData.result,
    collectionMarketData,
  );
  return <DataTable data={tokenWithMarketData} columns={columns} />;
}
