import { Card } from "primereact/card";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface VHsCardProps {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: number;
  releasedAt: number;
}

const VhsCard: FC<VHsCardProps> = ({
  id,
  title,
  description,
  genre,
  duration,
  releasedAt,
}) => {
  const navigate = useNavigate();

  const vhsCardHandler = () => {
    navigate(`/vhs/${id}`);
  };

  return (
    <Card
      title={title}
      onClick={vhsCardHandler}
      className="cursor-pointer hover:bg-gray-100"
    >
      <p className="m-0">{description}</p>
      <div className="mt-3">
        <span className="font-bold">Genre: </span> {genre}
      </div>
      <div className="mt-3">
        <span className="font-bold">Duration: </span> {duration} minutes
      </div>
      <div className="mt-3">
        <span className="font-bold">Released at: </span> {releasedAt}
      </div>
    </Card>
  );
};

export default VhsCard;
