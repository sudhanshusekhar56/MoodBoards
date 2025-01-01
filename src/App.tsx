import { useState } from "react";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar";
import Contents from "./components/Contents";
import Footer from "./components/Footer";

const App = () => {
  const [categoryData, setCategoryData] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const handleSearch = (query: string) => {
    setSearchResult(query);
    setCategoryData("");
    setIsInitialLoad(false);
  };

  const handleCategorySelect = (data: string) => {
    setCategoryData(data);
    setSearchResult("");
    setIsInitialLoad(false);
  };

  const handleInitailLoad = () => {
    setIsInitialLoad(true);
    setCategoryData("");
    setSearchResult("");
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} onInitialLoad={handleInitailLoad} />
      <Categories onCategorySelect={handleCategorySelect} />
      <Contents
        searchResult={searchResult}
        categoryData={categoryData}
        isInitialLoad={isInitialLoad}
        selected={
          isInitialLoad ? "All" : searchResult ? searchResult : categoryData
        }
      />
      <Footer />
    </div>
  );
};

export default App;
