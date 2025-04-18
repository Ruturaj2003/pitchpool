
import React from "react";
import { motion } from "framer-motion";
import { User, LayoutGrid } from "lucide-react";

interface HeaderProps {
  onDashboardClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDashboardClick }) => {
  return (
    <div className="p-4 flex items-center justify-between">
      <h1 className="text-lg font-bold bg-gradient-to-r from-shark-purple to-shark-blue bg-clip-text text-transparent">
        PitchPulse
      </h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDashboardClick}
        className="p-2 rounded-full hover:bg-shark-purple/10"
      >
        <LayoutGrid className="h-5 w-5 text-shark-purple" />
      </motion.button>
    </div>
  );
};

export default Header;