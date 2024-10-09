import { useState } from "react";
import { MainContext } from "./Context";

import Home from "./components/Home";

const App = () => {
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    species: "",
    location: "",
    search: "",
  });

  const contextData = {
    filters,
    setFilters,
  };

  return (
    <MainContext.Provider value={contextData}>
      <Home />
    </MainContext.Provider>
  );
};

export default App;
