import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-500 text-white py-4">
      <p className="text-center">&copy; {currentYear} Made with love ❤️</p>
    </footer>
  );
};

export default Footer;
