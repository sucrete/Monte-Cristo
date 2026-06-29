'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { cn } from '@/utils/cn';
import gsap from 'gsap';
import { ReactNode, useEffect, useRef } from 'react';

interface MobileMenuItemProps {
  id: string;
  title: string;
  children?: ReactNode;
  hasSubmenu?: boolean;
}

const MobileMenuItem = ({ id, title, children, hasSubmenu = false }: MobileMenuItemProps) => {
  const { activeSubmenu, toggleSubmenu } = useMobileMenuContext();
  const isActive = activeSubmenu === id;
  const submenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const submenu = submenuRef.current;
    if (!submenu) return;
    const items = Array.from(submenu.querySelectorAll('li'));
    if (isActive) {
      gsap.set(submenu, { display: 'block' });
      gsap.fromTo(items,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.05, ease: 'power2.out' },
      );
    } else {
      gsap.set(submenu, { display: 'none' });
      gsap.set(items, { opacity: 0, x: 10 });
    }
  }, [isActive]);

  const handleToggle = () => {
    if (hasSubmenu) {
      toggleSubmenu(id);
    }
  };

  return (
    <li className="relative space-y-0">
      <button
        onClick={handleToggle}
        className={cn(
          'sub-menu pr-1 text-tagline-1 border-stroke-4 dark:border-stroke-6 flex w-full cursor-pointer items-center justify-between border-b py-3 text-left transition-all duration-200',
          isActive ? 'text-secondary dark:text-accent font-medium' : 'text-secondary/60 dark:text-accent/60',
        )}
        aria-expanded={hasSubmenu ? isActive : undefined}
        aria-controls={hasSubmenu ? `submenu-${id}` : undefined}>
        <span>{title}</span>
        {hasSubmenu && (
          <span className={cn('transition-transform duration-300 ease-in-out', isActive && 'rotate-90')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 12L12 8L8 4"
                className="stroke-secondary dark:stroke-accent"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>

      {hasSubmenu && children && (
        <div
          ref={submenuRef}
          id={`submenu-${id}`}
          className="dark:bg-background-7 ml-3.5 w-full overflow-y-auto overflow-x-hidden bg-white hidden">
          {children}
        </div>
      )}
    </li>
  );
};

MobileMenuItem.displayName = 'MobileMenuItem';

export default MobileMenuItem;
