import { Image } from "@/interface/Image";
import React from "react";

interface SingleImageModelProps {
  image: Image;
  onClose: () => void;
}

const SingleImageModel: React.FC<SingleImageModelProps> = ({
  image,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white p-4 rounded-lg shadow-lg md:w-[50%] h-[85%] flex flex-col justify-center items-center">
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={image.src.large}
          alt={image.alt}
          className="rounded-lg w-[85%] md:w-[initial]"
        />
        <div className="mt-4 text-center">
          <p>
            <strong>Photographer:</strong>{" "}
            <a
              href={image.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {image.photographer}
            </a>
          </p>
          <p>
            <strong>Dimensions:</strong> {image.width} x {image.height}
          </p>
          <p>
            <strong>Average Color:</strong>{" "}
            <span
              className="inline-block w-4 h-4 rounded-full ml-1"
              style={{ backgroundColor: image.avg_color }}
            ></span>{" "}
            {image.avg_color}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleImageModel;
