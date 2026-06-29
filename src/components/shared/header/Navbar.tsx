'use client';

import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { splitMenuLeft, splitMenuRight } from '@/data/header';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import LogoBox from './LogoBox';
import MobileMenu from '../MobileMenu';
import NoticeTicker from './NoticeTicker';
import MobileMenuButton from './MobileMenuButton';
import NavCTAButton from './NavCTAButton';
import NavItemLink from './NavItemLink';

import Azteca from './Azteca';

interface NavbarFourProps {
  className?: string;
  megaMenuColor?: string;
  btnClassName?: string;
  menuColor?: string;
  isScrolledColor?: string;
  notices?: string[];
  tickerVisible?: boolean;
  forceDark?: boolean;
}

const NavbarFour = ({
  className,
  btnClassName,
  notices = [],
  tickerVisible = false,
  forceDark = false,
}: NavbarFourProps) => {
  const { isScrolled } = useNavbarScroll(100);
  const dark = isScrolled || forceDark;

  return (
    <MobileMenuProvider>
      <NoticeTicker isScrolled={isScrolled} notices={notices} visible={tickerVisible} />
      <header
        className={cn(
          // default
          'fixed left-0 top-0 z-50 flex w-full items-center transition-[padding,background-color,border-color,backdrop-filter,box-shadow,translate] duration-500 ease-in-out border-transparent pt-2 pb-2.5 px-2 lg:px-20 xl:px-25',
          isScrolled
            ? // when scrolled
              // ? 'translate-y-0 pt-2 pb-3 xl:pt-0 xl:pb-0 bg-white/90 dark:bg-transparent backdrop-blur-[9px] border-b border-solid border-[#0000000d]'
              'translate-y-0 pt-2 pb-3 xl:pt-0 xl:pb-0'
            : tickerVisible
              ? // if ticker is on when AT THE TOP
                'translate-y-[39px] md:translate-y-9'
              : // if ticker is turned off when AT THE TOP
                'translate-y-3 md:translate-y-0',
          className,
        )}>
        <Azteca
          className={cn(
            'absolute left-1/2 -top-[16px] -translate-x-1/2 w-[2083px] duration-500 transition-opacity',
            isScrolled ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between relative">
          <div className="flex items-center gap-[76px]">
            <nav className="hidden items-center xl:flex pb-0">
              <ul className="flex items-center gap-6 pb-0">
                {splitMenuLeft.map((item) => (
                  <li key={item?.id} className="py-6">
                    <NavItemLink variant={dark ? 'border' : 'white'} item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <LogoBox isScrolled={isScrolled} />
          <div className="flex items-center gap-[30px]">
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center gap-6 pb-0">
                {splitMenuRight.map((item) => {
                  // mega menu render
                  return (
                    <li key={item?.id} className={cn('py-6', item?.hasDropdown && 'group/nav relative cursor-pointer')}>
                      <NavItemLink variant={dark ? 'border' : 'white'} item={item} />
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <NavCTAButton
                href="/book-tee-time"
                btnClassName={cn('btn-header-bushwood hover:btn-white-dark', btnClassName)}
                label="Book Tee Time"
              />
              {/* mobile menu btn */}
              <MobileMenuButton
                className={cn(isScrolled ? 'py-4' : 'py-0')}
                hamburgerClassName={cn(dark ? 'text-[#070b10]' : 'text-white sm:text-[#070b10]')}
              />
            </div>
          </div>
        </div>
        <MobileMenu />
      </header>
    </MobileMenuProvider>
  );
};

export default NavbarFour;
