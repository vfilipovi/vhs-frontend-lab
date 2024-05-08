import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";

export const useCreateVhs = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (vhsData: FormData) =>
      axios
        .post(`${API_URL}`, vhsData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-vhs"],
      });
      navigate("/");
    },
  });
};
