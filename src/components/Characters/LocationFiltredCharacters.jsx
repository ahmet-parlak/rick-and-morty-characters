import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";

import { MainContext } from "../../Context";

import { FILTER_WITH_LOCATIONS } from "../../Apollo/queries";
import { Flex, Result, Pagination, Empty } from "antd";

import CharacterCard from "./CharacterCard";

const LocationFiltredCharacters = () => {
  const { filters } = useContext(MainContext);

  let { error, data, networkStatus } = useQuery(FILTER_WITH_LOCATIONS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      name: filters?.location,
    },
  });

  // Fetching Status
  let isFetching = false;
  if (networkStatus === 1 || networkStatus === 2) {
    isFetching = true;
  }

  if (networkStatus === 7) {
    isFetching = false;
  }

  // Data
  const charactersData = data?.locations;
  const characters = charactersData?.results[0].residents ?? [];

  const pageSize = 20;

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const totalCharacters = characters?.length;

  const paginationHandler = (page) => {
    setCurrentPage(page);
  };

  // Paginated Characters
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedCharacters = characters.slice(startIndex, endIndex);

  window.scrollTo({
    top: 250,
    behavior: "smooth",
  });

  return (
    <>
      <Flex className="characters-container" wrap gap="large" justify="center">
        {error && <Result status="warning" title="Something went wrong. Please try again later." />}
        {isFetching && <CharacterCard loading={isFetching} />}
        {paginatedCharacters?.map((character) => (
          <CharacterCard key={character?.id} loading={isFetching} character={character} />
        ))}

        {!isFetching && characters?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Flex>

      <Pagination
        align="center"
        total={totalCharacters}
        defaultPageSize={pageSize}
        current={currentPage}
        showSizeChanger={false}
        onChange={paginationHandler}
        hideOnSinglePage={true}
      />
    </>
  );
};

export default LocationFiltredCharacters;
