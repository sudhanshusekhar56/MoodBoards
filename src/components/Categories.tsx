import React from "react";

const categories = [
  { name: "Art", color: "#FF6347" },
  { name: "Music", color: "#FFD700" },
  { name: "Photography", color: "#8A2BE2" },
  { name: "Travel", color: "#20B2AA" },
  { name: "Food", color: "#FF4500" },
];

interface CategoriesProps {
  onCategorySelect: (categoryName: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const handleCategoryClick = (categoryName: string) => {
    onCategorySelect(categoryName);
  };

  return (
    <div className="flex flex-wrap justify-center mt-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className="m-2 p-2 md:p-4 rounded-lg shadow-sm w-28 md:w-40 text-center cursor-pointer"
          style={{ backgroundColor: category.color }}
          onClick={() => handleCategoryClick(category.name)}
        >
          <span className="text-white font-semibold text-sm md:text-base md:font-bold">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
