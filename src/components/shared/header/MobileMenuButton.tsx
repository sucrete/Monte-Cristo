'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { HamburgerIcon } from '@/icons';
import { cn } from '@/utils/cn';

interface MMButtonProps {
  className?: string;
  hamburgerClassName?: string;
}

const MobileMenuButton = ({ className = '', hamburgerClassName = '' }: MMButtonProps) => {
  const { openMenu, isOpen } = useMobileMenuContext();

  return (
    <div className="block xl:hidden">
      <button
        onClick={openMenu}
        className={cn(
          'nav-hamburger relative bg-transparent sm:bg-background-4 sm:hover:bg-ns-dark-green flex size-10 sm:size-12 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group',
          className,
        )}
        aria-label="Open mobile menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-menu">
        <span className="sr-only">Menu</span>
        <span className="block w-6 transition-colors duration-300">
          <HamburgerIcon className={hamburgerClassName} />
        </span>
      </button>
    </div>
  );
};

export default MobileMenuButton;
