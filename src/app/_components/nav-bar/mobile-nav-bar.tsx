import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaBomb } from 'react-icons/fa6';
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
    if (sectionId.toLowerCase() === 'about') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const createSprinkle = (color: string) => {
    const sprinkle = document.createElement('div');
    sprinkle.style.position = 'fixed';
    sprinkle.style.width = '10px';
    sprinkle.style.height = '10px';
    sprinkle.style.backgroundColor = color;
    sprinkle.style.borderRadius = '50%';
    sprinkle.style.pointerEvents = 'none';
    sprinkle.style.left = `${Math.random() * 100}vw`;
    sprinkle.style.top = `${Math.random() * 100}vh`;
    sprinkle.style.animation = `fall 3s linear`;
    document.body.appendChild(sprinkle);

    setTimeout(() => {
      document.body.removeChild(sprinkle);
    }, 3000);
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
          <motion.button
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 0, 0, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const colors = ['#FF69B4', '#00CED1', '#FFD700', '#FF6347', '#7B68EE'];
              for (let i = 0; i < 50; i++) {
                createSprinkle(colors[Math.floor(Math.random() * colors.length)]);
              }
            }}
          >
            <FaBomb className="text-white" size={20} />
          </motion.button>
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
