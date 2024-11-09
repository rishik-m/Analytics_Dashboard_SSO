import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { localisable } from "../utils/localisable";

interface CountryTradeData {
  CountryName: string;
  Year: number;
  CurrentYearTotalTradeValue: number;
}

interface CumulativeTradeData {
  CountryName: string;
  Year: number;
  CumulativeTradeValue: number;
}

// Calculates cumulative trade values per country by year from sorted trade data
const calculateCumulativeTradeValues = (
  data: CountryTradeData[]
): CumulativeTradeData[] => {
  const sortedData = data.sort((a, b) => {
    if (a.CountryName < b.CountryName) return -1;
    if (a.CountryName > b.CountryName) return 1;
    return a.Year - b.Year;
  });

  const cumulativeData: CumulativeTradeData[] = [];

  let countryTradeSum: Record<string, number> = {};

  sortedData.forEach((item) => {
    if (!countryTradeSum[item.CountryName]) {
      countryTradeSum[item.CountryName] = 0;
    }

    countryTradeSum[item.CountryName] += item.CurrentYearTotalTradeValue;

    cumulativeData.push({
      CountryName: item.CountryName,
      Year: item.Year,
      CumulativeTradeValue: countryTradeSum[item.CountryName],
    });
  });

  return cumulativeData;
};

const fetchCumulativeTradeData = async (): Promise<CumulativeTradeData[]> => {
  try {
    const response = await axios.get<CountryTradeData[]>(
      "/CountryWiseTrade.json"
    );
    const cumulativeData = calculateCumulativeTradeValues(response.data);
    return cumulativeData;
  } catch (error) {
    throw new Error(localisable.error.failedToFetch);
  }
};

export const useFetchCumulativeTradeData = () => {
  return useQuery<CumulativeTradeData[], Error>({
    queryKey: ["cumulativeTradeData"],
    queryFn: fetchCumulativeTradeData,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
