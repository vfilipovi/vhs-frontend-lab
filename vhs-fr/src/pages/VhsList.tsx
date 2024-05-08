import VhsCard from "../components/main/Vhs/VhsCard";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { VhsData } from "../types/types";
import useDebounce from "../hooks/network/useDebounce";
import { useVhsSearch } from "../hooks/reactQuery/useVhsSearch";

const VhsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [previousData, setPreviousData] = useState<VhsData[]>();
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const { data, isLoading, isError } = useVhsSearch(
    debouncedSearchTerm,
    previousData
  );

  // Effect to update previous data when 'data' changes. prevents re-render -> "searchTerm" key
  useEffect(() => {
    if (data) {
      setPreviousData(data);
    }
  }, [data]);

  if (isError) {
    return <div>Error occurred! {isError}</div>;
  }

  if (isLoading) {
    return <div>loading! </div>;
  }

  return (
    <div>
      <div>
        <InputText
          className="mb-5"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {data && data.length > 0 ? (
          data.map((vhs, index) => (
            <React.Fragment key={"fragment" + index}>
              <VhsCard
                id={vhs.id}
                title={vhs.title}
                description={vhs.description}
                genre={vhs.genre}
                duration={vhs.duration}
                releasedAt={vhs.releasedAt}
              />
              <div className="py-7"></div>
            </React.Fragment>
          ))
        ) : (
          <div className="font-bold text-3xl mt-8">No results found!</div>
        )}
      </div>
    </div>
  );
};

export default VhsList;
