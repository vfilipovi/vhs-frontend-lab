import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VhsData } from "../../types/types";
import { API_URL } from "../../utils/constants";

export const useVhsSearch = (
  searchTerm: string,
  previousData: VhsData[] | undefined
) => {
  const fetchVhs = async (): Promise<VhsData[]> => {
    const url =
      searchTerm.length > 0
        ? `${API_URL}?title=${encodeURIComponent(searchTerm)}`
        : API_URL;

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
