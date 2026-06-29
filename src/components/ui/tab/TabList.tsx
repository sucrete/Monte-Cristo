'use client';

import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';
import { useTab } from '../../../context/TabContext';

interface TabListProps {
  children: React.ReactNode;
  variant?: 'desktop' | 'mobile';
  className?: string;
  label?: string;
}

const TabList: React.FC<TabListProps> = ({ children, variant = 'desktop', className = '', label = 'Content tabs' }) => {
  const { registerTabBar } = useTab();
  const activeTabBarRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === 'desktop') {
      registerTabBar(activeTabBarRef.current);
    }
  }, [registerTabBar, variant]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
    );
    if (tabs.length === 0) return;
    const currentIdx = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let targetIdx: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetIdx = (currentIdx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetIdx = (currentIdx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      targetIdx = 0;
    } else if (e.key === 'End') {
      targetIdx = tabs.length - 1;
    }

    if (targetIdx !== null) {
      e.preventDefault();
      tabs[targetIdx].focus();
      tabs[targetIdx].click();
    }
  };

  // Active tab bar positioning is now handled by the TabContext when tabs switch

  const getClassName = (): string => {
    if (variant === 'desktop') {
      return cn(
        'tab-bar border-stroke-2 dark:border-stroke-6 relative mb-14 hidden items-center justify-center border-b lg:mb-[72px] lg:flex',
        className,
      );
    } else {
      return cn(
        'mb-14 flex flex-wrap items-center justify-start gap-4 sm:mx-auto sm:max-w-[500px] lg:mb-[72px] lg:hidden',
        className,
      );
    }
  };

  return (
    <div ref={tabListRef} role="tablist" aria-label={label} onKeyDown={handleKeyDown} className={getClassName()}>
      {/* Active tab bar indicator for desktop */}
      {variant === 'desktop' && <div ref={activeTabBarRef} className="active-tab-bar"></div>}

      {children}
    </div>
  );
};

TabList.displayName = 'TabList';
export default TabList;
