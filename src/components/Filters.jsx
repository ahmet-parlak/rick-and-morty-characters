import { useContext } from "react";
import { MainContext } from "../Context";

import { Flex, Tooltip, Button, Divider, Input, Radio, message } from "antd";
const { Search } = Input;
import { RedoOutlined } from "@ant-design/icons";

import { genders, species } from "../constants.js";

import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../Apollo/queries";

import { isFiltersEmpty } from "../Helpers/helpers.js";

function Filters() {
  const { filters: filtersVal, setFilters } = useContext(MainContext);

  let isFetching = false;
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_LOCATIONS, {
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 2) {
    isFetching = true;
  }

  if (networkStatus === 7 && isFetching) {
    isFetching = false;
  }

  const locations = data?.locations?.results?.map((location) => location.name) ?? [];

  if (error) {
    message.warning(error?.message ?? "Locations not found");
  }

  const gendersFilter = (e) => {
    setFilters({ ...filtersVal, gender: e.target.value, location: "" });
  };

  const speciesFilter = (e) => {
    setFilters({ ...filtersVal, species: e.target.value, location: "" });
  };

  const locationSearchHandler = (e) => {
    refetch({
      search: e.target.value,
    });
  };

  const locationsFilter = async (e) => {
    setFilters({ location: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ gender: "", species: "", location: "", search: "" });
  };

  return (
    <div className="filter-container">
      <Flex justify="space-between" align="center">
        <h2>Filters</h2>
        {!isFiltersEmpty(filtersVal) && (
          <Tooltip title="Clear Filters">
            <Button shape="circle" icon={<RedoOutlined />} onClick={clearFilters} />
          </Tooltip>
        )}
      </Flex>
      <Divider className="filter-divider" />

      <div className="filter">
        <h3>Gender</h3>
        <Radio.Group
          className="filter-options"
          options={genders}
          onChange={gendersFilter}
          value={filtersVal?.gender}
        />
      </div>
      <div className="filter">
        <h3>Species</h3>
        <Radio.Group
          className="filter-options"
          options={species}
          onChange={speciesFilter}
          value={filtersVal?.species}
        />
      </div>
      <div className="filter">
        <h3>Location</h3>
        <Search
          className="location-search"
          placeholder="Search location"
          onChange={locationSearchHandler}
          loading={loading || isFetching}
        />
        <Radio.Group
          className="filter-options"
          options={locations}
          onChange={locationsFilter}
          disabled={loading || isFetching}
          value={filtersVal?.location}
        />
      </div>
    </div>
  );
}

export default Filters;
