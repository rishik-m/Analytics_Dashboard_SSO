import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { localisable } from "../utils/localisable";

interface TradeRankData {
  Year: number;
  ReporterISO3: string;
  ReporterName: string;
  total_exports: number;
  rank: number;
}

const fetchTradeRanks = async (): Promise<TradeRankData[]> => {
  try {
    const response = await axios.get<TradeRankData[]>("/TradeRanks.json");
    return response.data;
  } catch (error) {
    throw new Error(localisable.error.failedToFetch);
  }
};

export const useFetchTradeRanks = () => {
  return useQuery<TradeRankData[], Error>({
    queryKey: ["tradeRanks"],
    queryFn: fetchTradeRanks,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
