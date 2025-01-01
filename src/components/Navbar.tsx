import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface NavbarProps {
  onSearch: (query: string) => void;
  onInitialLoad: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onInitialLoad }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update state with input value
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <nav className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-zinc-400">
      <div
        className="text-zinc-800 md:text-2xl text-xl font-bold cursor-pointer"
        onClick={() => onInitialLoad()}
      >
        MoodBoards
      </div>
      <form
        className="flex justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Button type="submit">Search...</Button>
      </form>
    </nav>
  );
};

export default Navbar;
