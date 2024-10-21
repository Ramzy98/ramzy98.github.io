import { AnimatePresence, motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

interface MobileNavBarProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  tabs: string[];
  activeTab: string;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  handleTabClick: (item: string) => void;
}

export default function MobileNavBar({
  isMenuOpen,
  isMobile,
  tabs,
  activeTab,
  setIsMenuOpen,
  handleTabClick,
}: MobileNavBarProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isMobile ? (
        <div className="md:hidden flex-grow-0 flex justify-end">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <IoMdClose size={24} color="#ffffff" />
              ) : (
                <FaBars size={24} color="#ffffff" />
              )}
            </motion.div>
          </motion.button>
        </div>
      ) : (
        <div className="hidden md:flex items-center justify-end flex-shrink-0 w-[200px]">
          <motion.div
            className="w-10 h-10 bg-purple-400 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
      )}
      {isMenuOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-gray-800 shadow-lg rounded-b-lg z-[100]"
        >
          <ul className="py-2">
            {tabs.map((item) => (
              <motion.li
                key={item}
                className="px-4 py-2"
                whileHover={{ backgroundColor: 'rgba(249, 71, 6, 0.15)' }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={`block w-full text-left ${
                    activeTab === item ? 'text-[#ff5722]' : 'text-white hover:text-[#ff5722]'
                  } transition-colors duration-200`}
                  onClick={() => {
                    handleTabClick(item);
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                >
                  <motion.span
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item}
                  </motion.span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
