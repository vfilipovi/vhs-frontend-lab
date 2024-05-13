import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VhsData } from "../../types/types";

export const useVhsSearch = (
  searchTerm: string,
  previousData: VhsData[] | undefined
) => {
  const fetchVhs = async (): Promise<VhsData[]> => {
    const url =
      searchTerm.length > 0
        ? `${import.meta.env.VITE_API_URL}?title=${encodeURIComponent(
            searchTerm
          )}`
        : import.meta.env.VITE_API_URL;

    const response = await axios.get(url);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-vhs", searchTerm],
    queryFn: fetchVhs,
    placeholderData: previousData,
  });

  return { data, isLoading, isError };
};
