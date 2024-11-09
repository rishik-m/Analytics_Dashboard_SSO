import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { localisable } from "../utils/localisable";

interface TradeData {
  PartnerISO3: string;
  TotalTradeValue: number;
}

interface AggregatedTradeData {
  partner: string;
  totalTradeValue: number;
}

// Aggregates trade values by partner, sorts them in descending order, and returns the top N partners
const aggregateTradeValues = (
  data: TradeData[],
  topN: number
): AggregatedTradeData[] => {
  const partnerTotals: { [key: string]: number } = {};

  data.forEach((item) => {
    const partner = item.PartnerISO3;
    partnerTotals[partner] =
      (partnerTotals[partner] || 0) + item.TotalTradeValue;
  });

  const sortedData = Object.entries(partnerTotals)
    .map(([partner, totalTradeValue]) => ({ partner, totalTradeValue }))
    .sort((a, b) => b.totalTradeValue - a.totalTradeValue);

  return sortedData.slice(0, topN);
};

const fetchTopPartnersData = async (
  topN: number
): Promise<AggregatedTradeData[]> => {
  try {
    const response = await axios.get<TradeData[]>("/TotalTrades.json");
    return aggregateTradeValues(response.data, topN);
  } catch (error) {
    throw new Error(localisable.error.failedToFetch);
  }
};

export const useFetchTopPartnersData = (topN: number) => {
  return useQuery<AggregatedTradeData[], Error>({
    queryKey: ["topPartnersData", topN],
    queryFn: () => fetchTopPartnersData(topN),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
