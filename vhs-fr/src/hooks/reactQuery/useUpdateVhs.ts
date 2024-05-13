import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useUpdateVhs = (id: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (vhsData: FormData) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/${id}`,
        vhsData
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-vhs"],
      });
      navigate("/");
    },
  });
};
