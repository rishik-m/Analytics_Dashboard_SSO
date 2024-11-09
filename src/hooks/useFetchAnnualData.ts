import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { localisable } from "../utils/localisable";

interface AnnualData {
  ReporterISO3: string;
  ReporterName: string;
  Year: number;
  AnnualTradeValue: number;
}

// Fetches data from a json and returns it as a typed response, handling errors with a localized message
const fetchAnnualData = async (): Promise<AnnualData[]> => {
  try {
    const response = await axios.get<AnnualData[]>("/AnnualValue.json");
    return response.data;
  } catch (error) {
    throw new Error(localisable.error.failedToFetch);
  }
};

export const useFetchAnnualData = () => {
  return useQuery<AnnualData[], Error>({
    queryKey: ["annualData"],
    queryFn: fetchAnnualData,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
