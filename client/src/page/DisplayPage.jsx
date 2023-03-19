import React, { useEffect, useState } from "react";

import { Card, FormField, Loader } from "../components";
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#a65dd6] text-xl uppercase">{title}</h2>
  );
};

const Home = (user) => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://dallehost.herokuapp.com/api/v1/posts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result.data);
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleSearchButtonClick = (searchValue) => {
    setSearchText(searchValue);

    setTimeout(() => {
      const updatedSearchText = searchValue.toLowerCase();
      const searchResult = allPosts.filter(
        (item) =>
          item.name.toLowerCase().includes(updatedSearchText) ||
          item.prompt.toLowerCase().includes(updatedSearchText)
      );
      setSearchedResults(searchResult);
    }, 100);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <div className="flex mt-8 ml-16 md:flex-row flex-col">
          <h1 className="font-extrabold text-[#222328] text-[48px]">
            DISCOVER
          </h1>
          <h1 className="ml-3 font-extrabold text-[#a65dd6] text-[48px]">
            {" "}
            ANYTHING
          </h1>
        </div>
      </div>

      <div className="mt-3">
        <FormField
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
          icon="search"
        />
      </div>
      <div className="md:flex gap-2 mt-2 justify-around items-center w-full md:pl-12 md:pr-12 pl-4 pr-4 grid grid-cols-3 ">
        <button className="font-inter font-medium hover:bg-gray-200 text-black px-4 py-2 rounded-md flex-col items-center flex h-fit text-center" onClick={() => handleSearchButtonClick("Wallpaper")}>
          Wallpaper
        </button>
        <button className="font-inter font-medium hover:bg-gray-200 text-black px-4 py-2 rounded-md flex h-fit flex-col items-center text-center" onClick={() => handleSearchButtonClick("Robot")}>Robot</button>
        <button className="font-inter font-medium hover:bg-gray-200 text-black px-4 py-2 rounded-md flex-col flex h-fit items-center" onClick={() => handleSearchButtonClick("Space")}>Space</button>
        <button className="font-inter font-medium hover:bg-gray-200 text-black px-4 py-2 rounded-md flex-col items-center flex h-fit" onClick={() => handleSearchButtonClick("Interior Design")}>
          Interior Design
        </button>
        <button className="font-inter font-medium hover:bg-gray-200 text-black px-4 py-2 rounded-md flex-col items-center flex h-fit" onClick={() => handleSearchButtonClick("Favicons")}>
          Favicons
        </button>
        <button className="font-inter font-medium hover:bg-gray-200 text-black px-4 py-2 rounded-md flex-col items-center flex h-fit" onClick={() => handleSearchButtonClick("Hero Images")}>
          Hero Images
        </button>
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-1">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
