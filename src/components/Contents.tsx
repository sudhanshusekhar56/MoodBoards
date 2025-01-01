import "../App.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Image } from "@/interface/Image";
import SingleImageModel from "./SingleImageModel";

const Contents = ({
  searchResult,
  categoryData,
  isInitialLoad,
  selected,
}: {
  searchResult: string;
  categoryData: string;
  isInitialLoad: boolean;
  selected: string;
}) => {
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add("no-scroll"); // Disable scrolling
    } else {
      document.body.classList.remove("no-scroll"); // Enable scrolling
    }

    return () => document.body.classList.remove("no-scroll");
  }, [selectedImage]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["search", searchResult, categoryData, isInitialLoad, page],
    queryFn: async () => {
      const url = isInitialLoad
        ? `https://api.pexels.com/v1/curated?per_page=30&page=${page}`
        : `https://api.pexels.com/v1/search?query=${
            searchResult || categoryData
          }&per_page=15&page=${page}`;

      const response = await fetch(url, {
        headers: {
          Authorization:
            "1Q3JcjbtNKqMhzAgt38r75iyx7jZ08BDoOJoUeBAJtCIF0qFhTEGrgxm",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return response.json();
    },
    keepPreviousData: true, // Retain the previous data while fetching new data
  });

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    refetch(); // Trigger re-fetching with the updated page number
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      refetch();
    }
  };

  return (
    <div className="my-4 md:my-12 w-[90%] md:w-[80%] mx-auto">
      <h1 className="pl-1 text-xl font-bold text-left mb-5">{selected}</h1>
      {isLoading ? (
        <div className="w-[inherit] h-[50%] flex absolute items-center justify-center bg-black opacity-70">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 md:gap-2.5 justify-between">
          {data?.photos.map((photo: Image) => (
            <div
              key={photo.id}
              className="rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(photo)}
            >
              <img
                src={photo.src.medium}
                alt={photo.alt}
                className="w-28 h-32 md:w-72 md:h-96 rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-4 mt-5">
        <button
          className="font-semibold px-3 py-2 border rounded-md disabled:opacity-50"
          onClick={handlePrev}
          disabled={page === 1}
        >
          {"<"} Prev
        </button>
        <button
          className="font-semibold px-3 py-2 border rounded-md"
          onClick={handleNext}
        >
          Next {">"}
        </button>
      </div>
      {selectedImage && (
        <SingleImageModel
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Contents;
