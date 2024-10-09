import { useContext } from "react";
import { MainContext } from "../Context";
import { Image, Input } from "antd";

const { Search } = Input;
function Header() {
  const { filters, setFilters } = useContext(MainContext);

  const searchHandler = (e) => {
    setFilters({ ...filters, search: e.target.value, location: "" });
  };

  return (
    <div className="header">
      <Image src="/banner.webp" preview={false} />
      <div className="search">
        <Search
          size="large"
          placeholder="Search character"
          style={{ width: "50%" }}
          onChange={searchHandler}
          value={filters?.search}
        />
      </div>
    </div>
  );
}

export default Header;
