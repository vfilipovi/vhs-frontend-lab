import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { VhsData } from "../types/types";
import { API_URL } from "../utils/constants";

interface DeleteResponse {
  message: string;
}

const VhsDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getVhs = async (): Promise<VhsData> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-single-vhs", id],
    queryFn: getVhs,
  });

  const deleteMutation = useMutation<DeleteResponse, Error>({
    mutationFn: async () => {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log(response, "response");

      queryClient.invalidateQueries({
        queryKey: ["get-vhs"],
      });
      navigate("/");
      return response.data;
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const deleteVhsHandler = async () => {
    deleteMutation.mutate();
  };

  const editVhsHandler = async () => {
    navigate(`/vhs/${id}/edit`);
  };

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (isError) {
    return <div>Error occurred!</div>;
  }

  if (data) {
    return (
      <>
        <Card title={data.title} className="max-w-lg mx-auto">
          <p className="text-lg mb-2">
            <strong>Description:</strong> {data.description}
          </p>
          <p className="text-lg mb-2">
            <strong>Genre:</strong> {data.genre}
          </p>
          <p className="text-lg mb-2">
            <strong>Duration:</strong> {data.duration} minutes
          </p>
          <p className="text-lg mb-2">
            <strong>Released At:</strong> {data.releasedAt}
          </p>
          <p className="text-lg mb-2">
            <strong>Rental Price:</strong> ${data.rentalPrice}
          </p>
          <p className="text-lg mb-2">
            <strong>Rental Duration:</strong> {data.rentalDuration} days
          </p>
          <p className="text-lg mb-2">
            <strong>Quantity:</strong> {data.quantity}
          </p>
          {data.thumbnail && (
            <div className="mt-6 flex justify-center">
              <img
                src={`${"http://localhost:3000/"}${data.thumbnail}`}
                alt="Thumbnail"
                className="rounded-lg"
              />
            </div>
          )}
        </Card>

        <div className="flex justify-center">
          <div className="mt-8 flex justify-evenly w-7/12">
            <Button
              label="Delete"
              severity="danger"
              onClick={deleteVhsHandler}
            />

            <Button label="Edit" severity="info" onClick={editVhsHandler} />
          </div>
        </div>
      </>
    );
  }
};

export default VhsDetails;
