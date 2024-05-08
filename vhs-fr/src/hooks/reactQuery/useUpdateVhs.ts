import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const useUpdateVhs = (id: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (vhsData: FormData) =>
      axios.patch(`${API_URL}/${id}`, vhsData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-vhs"],
      });
      navigate("/");
    },
  });
};
