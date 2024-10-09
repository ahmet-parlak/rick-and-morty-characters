import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { MainContext } from "../../Context";

import { GET_CHARACTERS } from "../../Apollo/queries";
import { Flex, Result, Pagination, Empty } from "antd";

import CharacterCard from "./CharacterCard";

import LocationFiltredCharacters from "./LocationFiltredCharacters";

const Characters = () => {
  const { filters } = useContext(MainContext);

  const isLocationFiltred = filters?.location?.length > 0;

  let { error, data, networkStatus, refetch } = useQuery(GET_CHARACTERS, {
    skip: isLocationFiltred,
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      ...filters,
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
  const charactersData = data?.characters;
  const charactersDataInfo = charactersData?.info;
  const characters = charactersData?.results ?? [];

  // Pagination
  const totalCharacters = charactersDataInfo?.count;
  const currentPage = charactersDataInfo?.next
    ? charactersDataInfo?.next - 1
    : charactersDataInfo?.prev + 1;

  const paginationHandler = (page) => {
    refetch({
      page,
    });
  };

  window.scrollTo({
    top: 250,
    behavior: "smooth",
  });

  return isLocationFiltred ? (
    <LocationFiltredCharacters />
  ) : (
    <>
      <Flex className="characters-container" wrap gap="large" justify="center">
        {error && <Result status="warning" title="Something went wrong. Please try again later." />}
        {isFetching && <CharacterCard loading={isFetching} />}
        {characters.map((character) => (
          <CharacterCard key={character?.id} loading={isFetching} character={character} />
        ))}
        {!isFetching && characters?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Flex>

      <Pagination
        align="center"
        total={totalCharacters}
        current={currentPage}
        defaultPageSize={20}
        showSizeChanger={false}
        onChange={paginationHandler}
        hideOnSinglePage={true}
      />
    </>
  );
};

export default Characters;
