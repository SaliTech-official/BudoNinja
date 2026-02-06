import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../UI/Button';
import { HamburgerButton } from '../Header/HamburgerButton';

const navLinks = [
  { name: 'صفحه اصلی', href: '/' },
  { name: 'اخبار', href: '/news' },
  { name: 'مسابقات', href: '/events' },
  { name: 'تماس با ما', href: '/contact' },
  { name: 'درباره ما', href: '/about' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-700 bg-bg-secondary backdrop-blur-sm">
        <div className="w-full flex h-20 items-center justify-between px-6 lg:px-20">
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-50">BudoNinja</span>
            </Link>
          </div>

          <div>
            <nav className="hidden lg:flex gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-neutral-200 transition-colors duration-200 ease-in-out hover:text-primary-500"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
          </div>


          <div className="flex items-center gap-4">
            <Button variant="primary" size="lg" className="hidden lg:flex">
              ورود به پنل
            </Button>
            
            <div className="lg:hidden">
              <HamburgerButton isOpen={isMobileMenuOpen} onClick={toggleMenu} />
            </div>
          </div>

        </div>
      </header>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 top-20 bg-black/50 z-40 lg:hidden"
            />
          
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 right-0 h-[calc(100vh-80px)] w-full max-w-sm bg-bg-secondary p-8 z-40 lg:hidden"
            >
              <nav className="flex flex-col items-start gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={closeMenu}
                    className="text-lg font-medium text-neutral-200 transition-colors duration-200 ease-in-out hover:text-primary-500"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button variant="primary" size="lg" className="w-full mt-6">
                  ورود به پنل
                </Button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}