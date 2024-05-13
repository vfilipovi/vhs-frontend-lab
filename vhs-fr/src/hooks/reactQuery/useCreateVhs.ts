import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useCreateVhs = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (vhsData: FormData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}`,
        vhsData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
