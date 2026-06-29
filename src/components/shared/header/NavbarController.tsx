'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const DARK_NAV_PATHS = ['/blog', '/online-store'];

interface NavbarControllerProps {
  notices?: string[];
  tickerVisible?: boolean;
}

const NavbarController = ({ notices, tickerVisible }: NavbarControllerProps) => {
  const pathname = usePathname();
  const forceDark = DARK_NAV_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
  return <Navbar notices={notices} tickerVisible={tickerVisible} forceDark={forceDark} />;
};

export default NavbarController;
