import React, { useState, useEffect, useCallback } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = useCallback(async () => {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=5`
    );
    const data = await response.json();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setImages((prevImages) => [...prevImages, ...data]);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setImages([]); // Clear images for the new page
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setImages([]); // Clear images for the new page
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 && (
          <>
            <div className="col-span-2 sm:col-span-3 lg:col-span-2 row-span-2">
              <img
                src={images[0].download_url}
                alt={images[0].author}
                className="w-full h-full object-cover rounded-lg shadow-md"
                style={{ height: "300px" }}
              />
            </div>
            {images.slice(1).map((image, index) => (
              <div key={index} className="col-span-1">
                <img
                  src={image.download_url}
                  alt={image.author}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  style={{ height: "150px" }}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="text-center mt-8 flex justify-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md"
        >
          Next
        </button>
        <button
          onClick={loadMoreImages}
          className="px-4 py-2 bg-green-500 text-white rounded shadow-md"
          disabled={!hasMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Gallery;
